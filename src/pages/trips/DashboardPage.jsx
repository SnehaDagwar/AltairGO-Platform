import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { MapPin, Clock, DollarSign, Star, Share2, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { getUserTrips, shareTrip } from '../../services/api.js';
import { DashboardSkeleton } from '../../components/skeletons/Skeleton.jsx';
import toast from 'react-hot-toast';

const PAGE_SIZE = 12;

const TripCard = ({ trip, onShare }) => {
  const navigate = useNavigate();
  const itinerary = (() => {
    try {
      return trip.itinerary_json
        ? (typeof trip.itinerary_json === 'string' ? JSON.parse(trip.itinerary_json) : trip.itinerary_json)
        : null;
    } catch { return null; }
  })();
  const title = trip.trip_title || itinerary?.trip_title || trip.title || 'My Trip';
  const dests = itinerary?.destinations || itinerary?.itinerary?.map(d => d.place || d.name) || trip.destinations || [];
  const days = itinerary?.itinerary?.length || itinerary?.days?.length || trip.duration || trip.total_days || 0;
  const budget = itinerary?.total_cost ?? itinerary?.budget?.total ?? trip.budget ?? trip.total_cost ?? null;
  const destinationStr = Array.isArray(dests)
    ? dests.map(d => typeof d === 'string' ? d : d?.name).filter(Boolean).join(' · ')
    : dests;

  return (
    <div
      onClick={() => navigate(`/trip/${trip.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/trip/${trip.id}`); }}}
      aria-label={`View trip ${title}`}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '24px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--fg)' }}>{title}</h3>
          {trip.is_featured && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#eab308', background: '#fefce8', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
              <Star size={12} fill="#eab308" /> Featured
            </span>
          )}
        </div>
        {destinationStr && (
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={13} /> {destinationStr}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'var(--muted)', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
        {days > 0 && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} /> {days} {days === 1 ? 'day' : 'days'}
          </span>
        )}
        {budget && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <DollarSign size={13} /> ₹{Number(budget).toLocaleString('en-IN')}
          </span>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.7 }}>
          {new Date(trip.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }} onClick={e => e.stopPropagation()}>
        <button
          onClick={() => onShare(trip)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--bg)',
            color: 'var(--fg)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          <Share2 size={13} /> Share
        </button>
        <button
          onClick={() => navigate(`/trip/${trip.id}`)}
          style={{
            flex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--fg)',
            color: 'var(--bg)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          View Plan <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserTrips(page);
      const items = Array.isArray(data) ? data : (data.items || data.trips || []);
      setTrips(prev => page === 1 ? items : [...prev, ...items]);
      setHasMore(items.length >= PAGE_SIZE);
    } catch {
      toast.error('Failed to load trips');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate('/login?redirect=/trips'); }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    fetchTrips();
  }, [user, fetchTrips]);

  const handleShare = async (trip) => {
    try {
      const data = await shareTrip(trip.id);
      const url = data.share_url || `${window.location.origin}/trip/shared/${data.share_token}`;
      await navigator.clipboard.writeText(url);
      toast.success('Share link copied!');
    } catch {
      toast.error('Could not get share link');
    }
  };

  if (authLoading) return (
    <div style={{ minHeight: '100vh', paddingTop: '8rem', maxWidth: '1200px', margin: '0 auto', padding: '8rem 1.5rem 2rem' }}>
      <DashboardSkeleton count={3} />
    </div>
  );

  if (!user) return null;

  return (
    <div style={{ paddingTop: 'var(--navbar-offset, 88px)', minHeight: '100vh', background: '#f5f4ed' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: '#141413', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
              Hello, {user.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ color: '#5e5d59', fontSize: '1.05rem' }}>
              {trips.length > 0 ? `You have ${trips.length} saved trip${trips.length > 1 ? 's' : ''}` : 'Plan your next adventure'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link
              to="/planner"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', background: '#141413', color: 'white', textDecoration: 'none', borderRadius: '50px', fontWeight: 700, fontSize: '0.9rem' }}
            >
              <Plus size={16} /> New Trip
            </Link>
            <button
              onClick={() => { logout(); navigate('/'); }}
              style={{ padding: '0.7rem 1.25rem', border: '1px solid #f0eee6', background: 'white', color: '#5e5d59', borderRadius: '50px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.85rem' }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats strip */}
        {!loading && trips.length > 0 && (() => {
          const currentYear = new Date().getFullYear();
          const totalBudgetSpent = trips.reduce((sum, t) => sum + (Number(t.total_cost) || 0), 0);
          const tripsThisYear = trips.filter(t => t.created_at && new Date(t.created_at).getFullYear() === currentYear).length;
          const stats = [
            { label: 'Trips Planned', value: trips.length, icon: '🗺️' },
            { label: 'Total Budget', value: `₹${totalBudgetSpent.toLocaleString('en-IN')}`, icon: '💰' },
            { label: 'Trips This Year', value: tripsThisYear, icon: '📅' },
          ];
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: 'white', borderRadius: '16px', padding: '1.4rem 1.5rem', boxShadow: '0 2px 8px rgba(79,70,229,0.07)', border: '1px solid #ede9fe', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem', lineHeight: 1 }}>{s.icon}</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4F46E5', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#87867f', fontWeight: 600, marginTop: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          );
        })()}

        {loading && trips.length === 0 ? (
          <DashboardSkeleton count={6} />
        ) : trips.length > 0 ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {trips.map(trip => (
                <TripCard key={trip.id} trip={trip} onShare={handleShare} />
              ))}
            </div>
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={loading}
                  style={{ padding: '0.85rem 2.5rem', background: '#faf9f5', color: '#141413', border: '1px solid #f0eee6', borderRadius: '50px', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px dashed #f0eee6',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✈️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#141413', marginBottom: '0.75rem' }}>Your adventures start here</h2>
            <p style={{ color: '#5e5d59', maxWidth: '440px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Tell us your destination, budget, and travel style — our AI builds a complete day-by-day plan with real costs in under 30 seconds.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {['✅ Real cost breakdowns', '✅ Hotel & flight included', '✅ Fully editable plan'].map((b, i) => (
                <span key={i} style={{ background: '#f0fdf4', color: '#065f46', padding: '5px 14px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600 }}>{b}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/planner"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '0.9rem 2.25rem', background: '#141413', color: 'white', textDecoration: 'none', borderRadius: '50px', fontWeight: 700, fontSize: '1rem' }}
              >
                <Sparkles size={18} /> Plan My First Trip
              </Link>
              <Link
                to="/discover"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.9rem 2rem', background: 'white', color: '#141413', textDecoration: 'none', borderRadius: '50px', fontWeight: 600, fontSize: '0.95rem', border: '1px solid #f0eee6' }}
              >
                Browse destinations first
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
