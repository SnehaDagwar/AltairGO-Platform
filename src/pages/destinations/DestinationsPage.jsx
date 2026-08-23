import React, { useEffect, useState, useCallback } from 'react';
import { Search, SearchX, Sparkles, X } from 'lucide-react';
import styles from './DestinationsPage.module.css';
import DestinationCard from '../../components/destinations/DestinationCard/DestinationCard.jsx';
import { getDestinations, recommend } from '../../services/api.js';
import toast from 'react-hot-toast';
import heroBg from '../../assets/hero-page-image.webp';

const getCardVariant = (index) => {
  const i = index % 10;
  if (i === 0) return 'large';
  if (i === 3 || i === 7) return 'tall';
  if (i === 4 || i === 8) return 'wide';
  return 'default';
};

const BUDGET_FILTERS = ['All', 'budget', 'mid', 'luxury'];
const TRAVELER_FILTERS = ['All', 'solo', 'couple', 'family', 'group'];

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('All');
  const [travelerFilter, setTravelerFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [aiQuery, setAiQuery] = useState('');
  const [aiSearchLoading, setAiSearchLoading] = useState(false);

  const fetchDestinations = useCallback(async (pageNum, signal = null) => {
    setLoading(true);
    try {
      const params = { limit: 20, page: pageNum, signal };
      if (budgetFilter !== 'All') params.budget_category = budgetFilter;
      if (travelerFilter !== 'All') params.traveler_type = travelerFilter;
      const data = await getDestinations(params);
      const items = Array.isArray(data) ? data : (data.items || data.destinations || []);
      if (pageNum === 1) {
        setDestinations(items);
      } else {
        setDestinations(prev => [...prev, ...items]);
      }
      setHasMore(items.length === 20);
    } catch (err) {
      if (err.name === 'AbortError') return;
      // Real failure: stop loading so the "No destinations found" state shows
      toast.error('Failed to load destinations', { id: 'fetch-destinations-error' });
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [budgetFilter, travelerFilter]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
    const controller = new AbortController();
    fetchDestinations(1, controller.signal);
    return () => controller.abort();
  }, [budgetFilter, travelerFilter, fetchDestinations]);

  // Append subsequent pages when "Load More" increments the page
  useEffect(() => {
    if (page > 1) {
      const controller = new AbortController();
      fetchDestinations(page, controller.signal);
      return () => controller.abort();
    }
  }, [page, fetchDestinations]);

  const handleAiSearch = async (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setAiSearchLoading(true);
    try {
      const params = { q: aiQuery.trim(), limit: 8 };
      if (budgetFilter !== 'All') params.budget_category = budgetFilter;
      if (travelerFilter !== 'All') params.traveler_type = travelerFilter;
      const data = await recommend(params);
      const items = Array.isArray(data) ? data : (data.destinations || []);
      if (items.length > 0) {
        setDestinations(items);
        toast.success(`AI found ${items.length} matches for "${aiQuery}"`);
      } else {
        toast.error('No matches found. Try a different query.');
      }
    } catch {
      toast.error('AI search failed. Try again.');
    } finally {
      setAiSearchLoading(false);
    }
  };

  const filtered = destinations.filter((d) =>
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.state_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filtersActive =
    budgetFilter !== 'All' || travelerFilter !== 'All' || searchTerm.trim() !== '';

  const clearAllFilters = () => {
    setBudgetFilter('All');
    setTravelerFilter('All');
    setSearchTerm('');
  };

  return (
    <main style={{ paddingBottom: '4rem', minHeight: '100vh', background: 'var(--bg)' }}>
      <div className={styles.pageHeaderWrapper}>
        <img
          src={heroBg}
          alt="Atmospheric landscape"
          className={styles.headerBgImage}
        />
        <div className={styles.headerOverlay} />
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Explore <span className={styles.accentTitleText}>the World</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Discover breathtaking locations handcrafted for your perfect getaway.
          </p>

          <div className={styles.searchWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search destinations, states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              style={{ paddingRight: searchTerm ? '48px' : undefined }}
            />
            {searchTerm && (
              <button
                type="button"
                aria-label="Clear search"
                className={styles.searchClear}
                onClick={() => setSearchTerm('')}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className={styles.filterRow}>
            {BUDGET_FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.filterChip} ${budgetFilter === f ? styles.active : ''}`}
                onClick={() => setBudgetFilter(f)}
              >
                {f === 'All' ? 'All Budgets' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.filterRow}>
            {TRAVELER_FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.filterChip} ${travelerFilter === f ? styles.active : ''}`}
                onClick={() => setTravelerFilter(f)}
              >
                {f === 'All' ? 'All Travelers' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Semantic AI search */}
          <form onSubmit={handleAiSearch} className={styles.aiSearchPanel}>
            <span className={styles.aiSparkleIcon}>
              <Sparkles size={16} />
            </span>
            <input
              type="text"
              className={styles.aiSearchInput}
              value={aiQuery}
              onChange={e => setAiQuery(e.target.value)}
              placeholder='AI search: "beaches for families" or "mountain treks"'
            />
            <button
              type="submit"
              className={styles.aiSearchButton}
              disabled={aiSearchLoading || !aiQuery.trim()}
            >
              {aiSearchLoading ? (
                <span className={styles.spinner} aria-label="Searching" />
              ) : (
                'Search'
              )}
            </button>
          </form>
        </div>
      </div>

      <div className={styles.container} style={{ marginTop: '3rem' }}>

        <div className={styles.resultsBar}>
          <span className={styles.resultsCount}>
            {loading && destinations.length === 0
              ? 'Finding destinations for you…'
              : `${filtered.length} destination${filtered.length !== 1 ? 's' : ''} found`}
          </span>
          {filtersActive && !loading && (
            <button type="button" className={styles.clearFiltersBtn} onClick={clearAllFilters}>
              Clear filters <X size={14} />
            </button>
          )}
        </div>

        {loading && destinations.length === 0 ? (
          <div className={styles.grid}>
            {Array(8).fill(0).map((_, i) => {
              const v = getCardVariant(i);
              return (
                <div key={i} className={`${styles.skeletonCard} ${styles[`card_${v}`] || ''}`}>
                  <div className={`${styles.skeletonImage} ${styles.skeletonShimmer}`} />
                  <div className={styles.skeletonContent}>
                    <span className={`${styles.skeletonLine} ${styles.skeletonShimmer}`} style={{ width: '40%' }} />
                    <span className={`${styles.skeletonLine} ${styles.skeletonLineLg} ${styles.skeletonShimmer}`} style={{ width: '72%' }} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {filtered.length > 0 ? (
                filtered.map((dest, i) => (
                  <DestinationCard key={dest.id} dest={dest} variant={getCardVariant(i)} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <SearchX size={48} className={styles.emptyIcon} />
                  <h3>No destinations found</h3>
                  <p>
                    {searchTerm
                      ? `No results for "${searchTerm}". Try a different search.`
                      : 'Try adjusting your filters.'}
                  </p>
                  {filtersActive && (
                    <button type="button" className={styles.emptyAction} onClick={clearAllFilters}>
                      Reset all filters
                    </button>
                  )}
                </div>
              )}
            </div>

            {hasMore && !searchTerm && (
              <div className={styles.loadMoreWrap}>
                <button
                  type="button"
                  className={styles.loadMoreBtn}
                  onClick={() => setPage(p => p + 1)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className={styles.spinnerDark} aria-hidden="true" /> Loading…
                    </>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default DestinationsPage;
