import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ChevronRight, ChevronLeft, MapPin, Search, X, Plus, Minus, Sparkles, Check, Calendar, Users, DollarSign, Heart } from 'lucide-react';
import { getCountries, search as searchDestinations, recommend, generateItinerary } from '../../services/api.js';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import styles from './TripPlannerPage.module.css';
import heroBg from '../../assets/hero-page-image.webp';

const STYLES = ['adventure', 'cultural', 'relaxation', 'photography', 'food', 'spiritual', 'family'];
const TRAVELER_TYPES = [
  { value: 'solo', label: 'Solo', emoji: '🧍' },
  { value: 'couple', label: 'Couple', emoji: '👫' },
  { value: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
  { value: 'group', label: 'Group', emoji: '👥' },
  { value: 'senior', label: 'Senior', emoji: '🧓' },
];
const DIETARY = ['none', 'vegetarian', 'vegan', 'jain', 'halal', 'gluten-free'];
const INTERESTS = [
  { value: 'food', label: 'Food & Dining', emoji: '🍜' },
  { value: 'adventure', label: 'Adventure', emoji: '🧗' },
  { value: 'culture', label: 'Culture & History', emoji: '🏛️' },
  { value: 'photography', label: 'Photography', emoji: '📸' },
  { value: 'wellness', label: 'Wellness & Spa', emoji: '🧘' },
  { value: 'nightlife', label: 'Nightlife', emoji: '🎉' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { value: 'nature', label: 'Nature & Wildlife', emoji: '🌿' },
];

const getBudgetLabel = (budget, days, travelers) => {
  if (!days || !travelers) return '';
  const daily = budget / (days * travelers);
  if (daily < 1500) return 'Budget';
  if (daily < 4000) return 'Standard';
  return 'Luxury';
};

const TripPlannerPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);

  // Step 1: Where
  const [searchQuery, setSearchQuery] = useState(searchParams.get('destination') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDests, setSelectedDests] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [searchLoading, setSearchLoading] = useState(false);
  const [recommendLoading, setRecommendLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const recommendInFlight = useRef(false);

  // Step 2: When
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState(5);

  // Step 3: Budget
  const [budget, setBudget] = useState(25000);
  const [selectedStyles, setSelectedStyles] = useState(['cultural']);
  const [travelers, setTravelers] = useState(2);

  // Step 4: About You
  const [travelerType, setTravelerType] = useState('couple');
  const [childrenCount, setChildrenCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);
  const [dietary, setDietary] = useState('none');
  const [fitnessLevel, setFitnessLevel] = useState('moderate');
  const [specialOccasion, setSpecialOccasion] = useState('');
  const [accessibility, setAccessibility] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Budget hint
  const [budgetHint, setBudgetHint] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    getCountries().then(setCountries).catch(() => {});
    if (searchParams.get('destination')) {
      setSelectedDests([{ name: searchParams.get('destination'), id: 'custom' }]);
    }
    const t = setTimeout(() => setHasMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); return; }
    let stale = false;
    const t = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const data = await searchDestinations(searchQuery, 'destination', 8);
        if (stale) return;
        const items = Array.isArray(data) ? data : (data.results || data.destinations || []);
        setSearchResults(items.slice(0, 6));
      } catch {
        if (!stale) setSearchResults([]);
      }
      finally { if (!stale) setSearchLoading(false); }
    }, 300);
    return () => { clearTimeout(t); stale = true; };
  }, [searchQuery]);

  const handleRecommend = async () => {
    if (recommendInFlight.current) return;
    recommendInFlight.current = true;
    setRecommendLoading(true);
    try {
      const data = await recommend({ limit: 4, budget_category: budget < 10000 ? 'budget' : budget < 40000 ? 'mid' : 'luxury' });
      const items = Array.isArray(data) ? data : (data.destinations || []);
      setSearchResults(items.slice(0, 6));
      toast.success('Showing AI recommendations!');
    } catch {
      toast.error('Could not get recommendations');
    } finally {
      recommendInFlight.current = false;
      setRecommendLoading(false);
    }
  };

  const addDest = (dest) => {
    if (selectedDests.find(d => d.id === dest.id || d.name === dest.name)) return;
    setSelectedDests(prev => [...prev, dest]);
    if (dest.country_name) setSelectedCountry(dest.country_name);
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeDest = (id) => setSelectedDests(prev => prev.filter(d => d.id !== id && d.name !== id));

  const toggleStyle = (s) => {
    setSelectedStyles(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  // Debounced live budget hint
  useEffect(() => {
    if (step !== 3 || !budget || !duration || !travelers) return;
    const daily = Math.round(budget / (duration * travelers));
    const tier = daily < 1500 ? 'budget' : daily < 4000 ? 'mid' : 'luxury';
    const tierLabel = tier === 'budget' ? 'Budget' : tier === 'mid' ? 'Standard' : 'Luxury';
    setBudgetHint({ daily, tier, tierLabel });
  }, [budget, duration, travelers, step]);

  const toggleInterest = (val) => {
    setSelectedInterests(prev =>
      prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]
    );
  };

  const travelMonth = startDate ? new Date(startDate).toLocaleString('en', { month: 'long' }) : 'January';

  const handleGenerate = async () => {
    if (selectedDests.length === 0) { toast.dismiss(); toast.error('Please select at least one destination'); setStep(1); return; }
    if (!selectedCountry) { toast.error('Please select a country'); return; }

    setGenerating(true);
    try {
      const payload = {
        destination_country: selectedCountry,
        start_city: selectedCountry,
        selected_destinations: selectedDests.map(d => ({ name: d.name })),
        budget: Number(budget),
        duration: Number(duration),
        travelers: Number(travelers),
        style: selectedStyles[0] || 'cultural',
        traveler_type: travelerType,
        travel_month: travelMonth,
        use_engine: true,
        dietary_restrictions: dietary !== 'none' ? [dietary] : [],
        accessibility: accessibility ? 1 : 0,
        children_count: childrenCount,
        senior_count: seniorCount,
        special_occasion: specialOccasion || null,
        fitness_level: fitnessLevel,
        interests: selectedInterests.length > 0 ? selectedInterests : undefined,
      };
      if (startDate) payload.start_date = startDate;

      const res = await generateItinerary(payload);
      if (res.job_id) {
        navigate(`/planner/generating/${res.job_id}`, {
          state: { budget, duration, selectedDests, travelers, token }
        });
      } else {
        toast.error('Failed to start generation');
      }
    } catch (err) {
      toast.error(err.message || 'Generation failed');
      setGenerating(false);
    }
  };

  const STEPS = [
    { num: 1, label: 'Where' },
    { num: 2, label: 'When' },
    { num: 3, label: 'Budget' },
    { num: 4, label: 'About You' },
    { num: 5, label: 'Review' },
  ];

  return (
    <div className={styles.pageContainer}>
      <img src={heroBg} alt="Background" className={styles.bgImage} />
      <div className={styles.bgOverlay} />
      <div className={styles.contentWrapper}>

        {/* Progress Steps */}
        <div className={styles.stepperRow}>
          {STEPS.map((s, i) => {
            const isCompleted = step > s.num;
            const isActive = step === s.num;
            return (
              <React.Fragment key={s.num}>
                <div
                  className={`${styles.stepNode} ${isActive ? styles.stepNodeActive : ''} ${isCompleted ? styles.stepNodeCompleted : ''}`}
                  onClick={() => s.num < step && setStep(s.num)}
                >
                  <div className={styles.stepCircle}>
                    {isCompleted ? <Check size={16} strokeWidth={2.5} /> : s.num}
                  </div>
                  <span className={styles.stepLabel}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`${styles.stepConnector} ${step > s.num ? styles.stepConnectorActive : ''}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Custom Card component for central planning form */}
        <div className={styles.planningCard}>
          {/* Floral leaf motif for premium background overlay */}
          <svg className={styles.cardLeaf} viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 280 C 60 210, 60 140, 60 20" stroke="var(--color-teal)" strokeWidth="1.5" strokeOpacity="0.15" strokeLinecap="round" />
            <path d="M60 240 C 35 220, 25 190, 60 170" stroke="var(--color-teal)" strokeWidth="1.5" strokeOpacity="0.15" fill="var(--color-teal)" fillOpacity="0.03" />
            <path d="M60 180 C 30 160, 20 130, 60 110" stroke="var(--color-teal)" strokeWidth="1.5" strokeOpacity="0.15" fill="var(--color-teal)" fillOpacity="0.03" />
            <path d="M60 120 C 32 100, 22 70, 60 50" stroke="var(--color-teal)" strokeWidth="1.5" strokeOpacity="0.15" fill="var(--color-teal)" fillOpacity="0.03" />
            <path d="M60 210 C 85 190, 95 160, 60 140" stroke="var(--color-teal)" strokeWidth="1.5" strokeOpacity="0.15" fill="var(--color-teal)" fillOpacity="0.03" />
            <path d="M60 150 C 90 130, 100 100, 60 80" stroke="var(--color-teal)" strokeWidth="1.5" strokeOpacity="0.15" fill="var(--color-teal)" fillOpacity="0.03" />
            <path d="M60 90 C 88 70, 98 40, 60 20" stroke="var(--color-teal)" strokeWidth="1.5" strokeOpacity="0.15" fill="var(--color-teal)" fillOpacity="0.03" />
          </svg>
          <div className={styles.stepContainer}>

          {/* STEP 1: Where */}
          {step === 1 && (
            <div>
              <h2 className={styles.title}>
                Where do you <span className={styles.titleAccent}>want to go?</span>
              </h2>
              <p className={styles.subtitle}>Type a destination or let AI suggest the perfect place for you</p>

              <div className={styles.inputWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search — Goa, Manali, Rajasthan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && searchResults.length > 0) addDest(searchResults[0]); }}
                  className={styles.textInput}
                  onFocus={() => { if (hasMounted && searchQuery.length < 2 && searchResults.length === 0) handleRecommend(); }}
                  autoFocus
                />
              </div>

              {searchResults.length > 0 && (
                <div className={styles.suggestionsDropdown}>
                  {searchResults.map(dest => (
                    <div
                      key={dest.id}
                      onClick={() => addDest(dest)}
                      className={styles.suggestionItem}
                    >
                      <div className={styles.pinIconWrapper}>
                        <MapPin size={16} color="var(--color-teal)" style={{ margin: 'auto' }} />
                      </div>
                      <div className={styles.suggestionDetails}>
                        <div className={styles.suggestionName}>{dest.name}</div>
                        <div className={styles.suggestionLoc}>{dest.state_name || dest.country_name || ''}</div>
                      </div>
                      <Plus size={16} style={{ marginLeft: 'auto', color: 'var(--muted)' }} />
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handleRecommend}
                disabled={recommendLoading}
                className={styles.recommendBtn}
              >
                <Sparkles size={16} /> {recommendLoading ? 'Loading Suggestions...' : 'Recommend me destinations!'}
              </button>

              {/* Trending Picks Section */}
              {selectedDests.length === 0 && (
                <div className={styles.trendingSection}>
                  <div className={styles.trendingHeader}>
                    <h3 className={styles.trendingTitle}>Trending Picks</h3>
                    <p className={styles.trendingSubtitle}>Popular choices among travelers</p>
                  </div>
                  <div className={styles.trendingList}>
                    {[
                      { name: 'Kerala', category: 'Nature & Backwaters' },
                      { name: 'Goa', category: 'Beaches & Nightlife' },
                      { name: 'Ladakh', category: 'Adventure & Mountains' },
                      { name: 'Rishikesh', category: 'Spiritual & Adventure' },
                    ].map((pick) => (
                      <button 
                        key={pick.name} 
                        type="button"
                        className={styles.trendingCard}
                        onClick={() => addDest({ name: pick.name, id: pick.name })}
                      >
                        <span className={styles.trendingName}>{pick.name}</span>
                        <span className={styles.trendingCategory}>{pick.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDests.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontWeight: 500, color: 'var(--fg)', marginBottom: '8px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>Selected destinations:</div>
                  <div className={styles.selectedList}>
                    {selectedDests.map(d => (
                      <div key={d.id || d.name} className={styles.destPill}>
                        <MapPin size={12} /> {d.name}
                        <button onClick={() => removeDest(d.id || d.name)} className={styles.destPillRemove}>
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: When */}
          {step === 2 && (
            <div>
              <h2 className={styles.title}>When are you going?</h2>
              <p className={styles.subtitle}>Pick your travel dates and how long you'll be away</p>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 500, color: 'var(--fg)', marginBottom: '8px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>Start Date (optional)</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  style={{ 
                    width: '100%', 
                    height: '44px',
                    padding: '12px 16px', 
                    border: 'none',
                    borderRadius: 'var(--radius-sm)', 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '16px', 
                    fontWeight: '400',
                    background: 'var(--surface)',
                    color: 'var(--fg)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500, color: 'var(--fg)', marginBottom: '16px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  Duration <span style={{ color: 'var(--color-teal)', fontSize: '18px', fontWeight: 600 }}>{duration} days</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={21}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-teal)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginTop: '8px', fontFamily: 'var(--font-body)' }}>
                  <span>1 day</span><span>21 days</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {[3, 5, 7, 10].map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    style={{ 
                      padding: '12px', 
                      border: 'none', 
                      borderRadius: 'var(--radius-lg)', 
                      background: duration === d ? 'var(--color-teal)' : 'var(--surface)', 
                      color: 'var(--fg)', 
                      fontFamily: 'var(--font-body)', 
                      fontWeight: 500, 
                      cursor: 'pointer', 
                      transition: 'all var(--duration-fast)', 
                      fontSize: '14px' 
                    }}
                  >
                    {d} days
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Budget */}
          {step === 3 && (
            <div>
              <h2 className={styles.title}>Budget & Style</h2>
              <p className={styles.subtitle}>Set your total budget and travel style preferences</p>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 500, color: 'var(--fg)', marginBottom: '12px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  <span>Total Budget</span>
                  <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--fg)' }}>
                    ₹{Number(budget).toLocaleString('en-IN')}
                    <span style={{ fontSize: '12px', marginLeft: '8px', color: 'var(--fg)', background: 'var(--color-teal)', padding: '2px 8px', borderRadius: 'var(--radius-pill)', fontWeight: 500 }}>
                      {getBudgetLabel(budget, duration, travelers)}
                    </span>
                  </span>
                </label>
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: 600, color: 'var(--muted)' }}>₹</span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Math.max(500, Number(e.target.value)))}
                    min={500}
                    style={{ 
                      width: '100%', 
                      height: '44px',
                      padding: '12px 16px 12px 32px', 
                      border: 'none', 
                      borderRadius: 'var(--radius-sm)', 
                      fontFamily: 'var(--font-body)', 
                      fontSize: '16px', 
                      outline: 'none',
                      background: 'var(--surface)',
                      color: 'var(--fg)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <input
                  type="range"
                  min={500}
                  max={500000}
                  step={1000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-teal)' }}
                />

                {/* Live budget hint */}
                {budgetHint && (
                  <div style={{
                    marginTop: '16px', padding: '16px 20px', borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
                  }}>
                    <div style={{ fontFamily: 'var(--font-body)' }}>
                      <span style={{ fontWeight: 600, fontSize: '18px', color: 'var(--fg)' }}>
                        ₹{budgetHint.daily.toLocaleString('en-IN')}
                      </span>
                      <span style={{ color: 'var(--muted)', fontSize: '14px' }}> per person, per day</span>
                    </div>
                    <Badge variant="accent" size="sm">
                      {budgetHint.tierLabel} Travel
                    </Badge>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontWeight: 500, color: 'var(--fg)', marginBottom: '12px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>Trip Style (select all that apply)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {STYLES.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleStyle(s)}
                      style={{ 
                        padding: '8px 16px', 
                        border: 'none', 
                        borderRadius: 'var(--radius-pill)', 
                        background: selectedStyles.includes(s) ? 'var(--color-teal)' : 'var(--surface)', 
                        color: 'var(--fg)', 
                        fontFamily: 'var(--font-body)', 
                        fontWeight: 500, 
                        cursor: 'pointer', 
                        transition: 'all var(--duration-fast)', 
                        fontSize: '14px',
                        textTransform: 'capitalize' 
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 500, color: 'var(--fg)', marginBottom: '12px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>Number of Travelers</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button onClick={() => setTravelers(t => Math.max(1, t - 1))} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg)' }}>
                    <Minus size={16} />
                  </button>
                  <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--fg)', minWidth: '40px', textAlign: 'center', fontFamily: 'var(--font-body)' }}>{travelers}</span>
                  <button onClick={() => setTravelers(t => Math.min(20, t + 1))} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg)' }}>
                    <Plus size={16} />
                  </button>
                  <span style={{ color: 'var(--muted)', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                    {travelers === 1 ? 'person' : 'people'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: About You */}
          {step === 4 && (
            <div>
              <h2 className={styles.title}>Who's going?</h2>
              <p className={styles.subtitle}>Just the essentials — we'll handle the rest</p>

              {/* Traveler type */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 500, color: 'var(--fg)', marginBottom: '12px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>I'm traveling as...</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {TRAVELER_TYPES.map(t => (
                    <button
                      key={t.value}
                      onClick={() => setTravelerType(t.value)}
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: '6px', 
                        padding: '12px 20px', 
                        border: 'none',
                        borderRadius: 'var(--radius-lg)', 
                        background: travelerType === t.value ? 'var(--color-teal)' : 'var(--surface)', 
                        color: 'var(--fg)', 
                        fontFamily: 'var(--font-body)', 
                        cursor: 'pointer', 
                        transition: 'all var(--duration-fast)', 
                        minWidth: '80px' 
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{t.emoji}</span>
                      <span style={{ fontSize: '13px', fontWeight: 500 }}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Children/senior counts — only show if relevant */}
              {travelerType === 'family' && (
                <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <label style={{ display: 'block', fontWeight: 500, color: 'var(--fg)', marginBottom: '12px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>How many children?</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button onClick={() => setChildrenCount(c => Math.max(0, c - 1))} style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)', background: 'var(--glass-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifycontent: 'center', color: 'var(--fg)' }}><Minus size={14} style={{ margin: 'auto' }} /></button>
                    <span style={{ fontSize: '18px', fontWeight: 600, minWidth: '30px', textAlign: 'center', fontFamily: 'var(--font-body)', color: 'var(--fg)' }}>{childrenCount}</span>
                    <button onClick={() => setChildrenCount(c => c + 1)} style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)', background: 'var(--glass-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifycontent: 'center', color: 'var(--fg)' }}><Plus size={14} style={{ margin: 'auto' }} /></button>
                    <span style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>We'll pick family-friendly spots</span>
                  </div>
                </div>
              )}

              {travelerType === 'senior' && (
                <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <label style={{ display: 'block', fontWeight: 500, color: 'var(--fg)', marginBottom: '12px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>How many seniors?</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button onClick={() => setSeniorCount(s => Math.max(0, s - 1))} style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)', background: 'var(--glass-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifycontent: 'center', color: 'var(--fg)' }}><Minus size={14} style={{ margin: 'auto' }} /></button>
                    <span style={{ fontSize: '18px', fontWeight: 600, minWidth: '30px', textAlign: 'center', fontFamily: 'var(--font-body)', color: 'var(--fg)' }}>{seniorCount}</span>
                    <button onClick={() => setSeniorCount(s => s + 1)} style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)', background: 'var(--glass-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifycontent: 'center', color: 'var(--fg)' }}><Plus size={14} style={{ margin: 'auto' }} /></button>
                    <span style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>Gentle pacing, accessible venues</span>
                  </div>
                </div>
              )}

              {/* Interests */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 500, color: 'var(--fg)', marginBottom: '12px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>What excites you most? <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {INTERESTS.map(i => (
                    <button
                      key={i.value}
                      onClick={() => toggleInterest(i.value)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: 'var(--radius-pill)',
                        background: selectedInterests.includes(i.value) ? 'var(--color-teal)' : 'var(--surface)',
                        color: 'var(--fg)',
                        fontFamily: 'var(--font-body)', fontWeight: 500, cursor: 'pointer', fontSize: '14px',
                        transition: 'all var(--duration-fast)',
                      }}
                    >
                      <span>{i.emoji}</span> {i.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced options — collapsed by default */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(v => !v)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', padding: '0', marginBottom: showAdvanced ? '16px' : '0' }}
                >
                  <ChevronRight size={16} style={{ transform: showAdvanced ? 'rotate(90deg)' : 'none', transition: 'transform var(--duration-fast)' }} />
                  Advanced options (dietary, fitness, accessibility, special occasion)
                </button>

                {showAdvanced && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxSizing: 'border-box' }}>
                    {/* Dietary */}
                    <div>
                      <label style={{ display: 'block', fontWeight: 500, color: 'var(--fg)', marginBottom: '8px', fontSize: '13px', fontFamily: 'var(--font-body)' }}>Dietary preference</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {DIETARY.map(d => (
                          <button key={d} onClick={() => setDietary(d)} style={{ padding: '6px 12px', border: 'none', borderRadius: 'var(--radius-pill)', background: dietary === d ? 'var(--color-teal)' : 'var(--glass-bg)', color: 'var(--fg)', fontFamily: 'var(--font-body)', fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize', fontSize: '13px' }}>
                            {d === 'none' ? 'No restriction' : d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fitness */}
                    <div>
                      <label style={{ display: 'block', fontWeight: 500, color: 'var(--fg)', marginBottom: '8px', fontSize: '13px', fontFamily: 'var(--font-body)' }}>Activity intensity</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {[{ v: 'low', l: 'Easy going' }, { v: 'moderate', l: 'Moderate' }, { v: 'high', l: 'Very active' }].map(f => (
                          <button key={f.v} onClick={() => setFitnessLevel(f.v)} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: 'var(--radius-lg)', background: fitnessLevel === f.v ? 'var(--color-teal)' : 'var(--glass-bg)', color: 'var(--fg)', fontFamily: 'var(--font-body)', fontWeight: 500, cursor: 'pointer', fontSize: '13px' }}>
                            {f.l}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Accessibility */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-body)' }}>
                        <div style={{ fontWeight: 500, color: 'var(--fg)', fontSize: '13px' }}>Wheelchair / mobility access needed</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>We'll filter out venues with poor accessibility</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAccessibility(v => !v)}
                        style={{ width: '48px', height: '26px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', background: accessibility ? 'var(--color-teal)' : 'var(--glass-bg)', position: 'relative', transition: 'background var(--duration-fast)', flexShrink: 0 }}
                      >
                        <span style={{ position: 'absolute', top: '4px', left: accessibility ? '26px' : '4px', width: '18px', height: '18px', borderRadius: 'var(--radius-pill)', background: 'white', transition: 'left var(--duration-fast)' }} />
                      </button>
                    </div>

                    {/* Special occasion */}
                    <div>
                      <label style={{ display: 'block', fontWeight: 500, color: 'var(--fg)', marginBottom: '8px', fontSize: '13px', fontFamily: 'var(--font-body)' }}>Special occasion? <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
                      <input
                        type="text"
                        placeholder="e.g. honeymoon, birthday, anniversary..."
                        value={specialOccasion}
                        onChange={(e) => setSpecialOccasion(e.target.value)}
                        style={{ 
                          width: '100%', 
                          height: '44px',
                          padding: '12px 16px', 
                          border: 'none', 
                          borderRadius: 'var(--radius-sm)', 
                          fontFamily: 'var(--font-body)', 
                          fontSize: '14px', 
                          outline: 'none', 
                          background: 'var(--glass-bg)',
                          color: 'var(--fg)',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Review */}
          {step === 5 && (
            <div>
              <h2 className={styles.title}>Review & Generate</h2>
              <p className={styles.subtitle}>Confirm your trip details before generating</p>

              <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: <MapPin size={18} />, label: 'Destinations', value: selectedDests.map(d => d.name).join(', ') || 'None selected' },
                  { icon: <Calendar size={18} />, label: 'Duration', value: `${duration} days${startDate ? ` from ${new Date(startDate).toLocaleDateString('en-IN')}` : ''}` },
                  { icon: <DollarSign size={18} />, label: 'Budget', value: `₹${Number(budget).toLocaleString('en-IN')} total (${getBudgetLabel(budget, duration, travelers)})` },
                  { icon: <Users size={18} />, label: 'Travelers', value: `${travelers} ${travelers === 1 ? 'person' : 'people'} • ${travelerType}` },
                  { icon: <Heart size={18} />, label: 'Style', value: selectedStyles.join(', ') || 'Cultural' },
                  ...(selectedInterests.length > 0 ? [{ icon: <Sparkles size={18} />, label: 'Interests', value: selectedInterests.map(v => INTERESTS.find(i => i.value === v)?.label || v).join(', ') }] : []),
                  { icon: <Sparkles size={18} />, label: 'Dietary', value: dietary === 'none' ? 'No restrictions' : dietary },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--muted)', marginTop: '2px', flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ fontFamily: 'var(--font-body)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500, marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '15px' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                size="lg"
                loading={generating}
                disabled={generating || selectedDests.length === 0}
                onClick={handleGenerate}
                style={{ width: '100%', boxShadow: 'var(--shadow-md)', fontWeight: 600, fontSize: '16px' }}
              >
                <Sparkles size={20} />
                {generating ? 'Starting generation...' : 'Generate My AI Trip Plan'}
              </Button>

              {selectedDests.length === 0 && (
                <p style={{ color: 'var(--color-peach)', textAlign: 'center', marginTop: '12px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>Please go back and select at least one destination</p>
              )}
            </div>
          )}

          {/* Navigation controls */}
          <div className={styles.btnGroup}>
            <button
              type="button"
              className={styles.btnBack}
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              <ChevronLeft size={18} /> Back
            </button>

            {step < 5 && (
              <button
                type="button"
                className={styles.btnContinue}
                onClick={() => {
                  if (step === 1 && selectedDests.length === 0) {
                    toast.dismiss();
                    toast.error('Please select at least one destination');
                    return;
                  }
                  setStep(s => s + 1);
                }}
              >
                Continue <ChevronRight size={18} />
              </button>
            )}
          </div>
          </div> {/* end stepContainer */}
        </div> {/* end planningCard */}
      </div>
    </div>
  );
};

export default TripPlannerPage;
