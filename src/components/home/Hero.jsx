import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  CalendarBlank, 
  ArrowRight, 
  Compass, 
  Star, 
  ShieldCheck,
  AirplaneTilt
} from '@phosphor-icons/react';

import udaipurImg from '../../assets/udaipur-palace.jpg';
import kashmirImg from '../../assets/kashmir.jpg';
import keralaImg from '../../assets/journal_kerala.png';
import jaipurImg from '../../assets/jaipur-hawa.jpg';
import heroBgImage from '../../assets/hero-light-bg.jpg';

import styles from '../../pages/Home.module.css';

const HERO_DESTINATIONS = [
  {
    id: 'udaipur',
    title: 'Udaipur, Rajasthan',
    subtitle: 'City of Royal Palaces & Shimmering Lakes',
    img: udaipurImg,
    tag: 'Royal Heritage',
    query: 'Udaipur'
  },
  {
    id: 'kashmir',
    title: 'Pahalgam, Kashmir',
    subtitle: 'Emerald Valleys, Pine Forests & Snow Peaks',
    img: kashmirImg,
    tag: 'Mountain Paradise',
    query: 'Kashmir'
  },
  {
    id: 'kerala',
    title: 'Alleppey, Kerala',
    subtitle: 'Tranquil Houseboats & Backwater Canals',
    img: keralaImg,
    tag: 'Coastal Serenity',
    query: 'Kerala'
  },
  {
    id: 'jaipur',
    title: 'Hawa Mahal, Jaipur',
    subtitle: 'Pink City Architecture & Vibrant Bazars',
    img: jaipurImg,
    tag: 'Cultural Wonder',
    query: 'Jaipur'
  }
];

const QUICK_PROMPTS = [
  { label: '🏔️ Ladakh & Spiti', query: 'Ladakh' },
  { label: '🛶 Kerala Backwaters', query: 'Kerala' },
  { label: '🏰 Royal Rajasthan', query: 'Rajasthan' },
  { label: '🌊 Gokarna Beaches', query: 'Gokarna' },
  { label: '☕ Darjeeling Estates', query: 'Darjeeling' }
];

export default function Hero({ onPlan }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [destinationQuery, setDestinationQuery] = useState('');
  const [tripDuration, setTripDuration] = useState('5');

  const handleQuickPlan = (e) => {
    e.preventDefault();
    const query = destinationQuery.trim();
    if (query) {
      navigate(`/planner?destination=${encodeURIComponent(query)}&duration=${tripDuration}`);
    } else {
      onPlan();
    }
  };

  const handleChipClick = (query) => {
    setDestinationQuery(query);
    navigate(`/planner?destination=${encodeURIComponent(query)}&duration=${tripDuration}`);
  };

  const activeDest = HERO_DESTINATIONS[activeTab];

  return (
    <section className={styles.heroSection} aria-label="AltairGO Intelligent Travel Platform">
      {/* Ambient background light orbs */}
      <div className={styles.heroAmbientLight} aria-hidden="true">
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroOrb3} />
      </div>

      {/* Subtle backdrop texture overlay */}
      <div className={styles.heroBackdropTexture} aria-hidden="true" />

      <div className={styles.heroMainContainer}>
        {/* Main Headline Group */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={styles.heroHeadlineArea}
        >
          <h1 className={styles.heroMainTitle}>
            Discover More
          </h1>
          <div className={styles.heroCursiveAccent}>
            Than Destinations
          </div>
          <p className={styles.heroSubtitle}>
            Tailor-made itineraries, smart train and roadtrip routing, real-time seasonal awareness, and curated stays across India — designed by AI for the way you explore.
          </p>
        </motion.div>

        {/* Interactive AI Search & Quick-Planner Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={styles.heroSearchCardWrapper}
        >
          <form onSubmit={handleQuickPlan} className={styles.heroSearchForm}>
            {/* Destination Input field */}
            <div className={styles.heroSearchField}>
              <div className={styles.heroFieldIcon}>
                <MapPin size={20} weight="duotone" />
              </div>
              <div className={styles.heroFieldInputGroup}>
                <label htmlFor="hero-dest-input" className={styles.heroFieldLabel}>
                  Where to?
                </label>
                <input
                  id="hero-dest-input"
                  type="text"
                  placeholder="e.g. Udaipur, Munnar, Kashmir..."
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  className={styles.heroInputText}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={styles.heroFieldDivider} aria-hidden="true" />

            {/* Duration Selector */}
            <div className={styles.heroSearchFieldSmall}>
              <div className={styles.heroFieldIcon}>
                <CalendarBlank size={20} weight="duotone" />
              </div>
              <div className={styles.heroFieldInputGroup}>
                <label htmlFor="hero-duration-select" className={styles.heroFieldLabel}>
                  Duration
                </label>
                <select
                  id="hero-duration-select"
                  value={tripDuration}
                  onChange={(e) => setTripDuration(e.target.value)}
                  className={styles.heroSelect}
                >
                  <option value="3">3 Days (Weekend)</option>
                  <option value="5">5 Days (Standard)</option>
                  <option value="7">7 Days (1 Week)</option>
                  <option value="10">10 Days (Extended)</option>
                  <option value="14">14 Days (Grand Tour)</option>
                </select>
              </div>
            </div>

            {/* Submit Action CTA */}
            <button
              type="submit"
              className={styles.heroSubmitBtn}
              aria-label="Generate AI Itinerary"
            >
              <span>Build My Trip</span>
              <div className={styles.heroSubmitIconWrap}>
                <ArrowRight size={16} weight="bold" />
              </div>
            </button>
          </form>

          {/* Quick Trending Prompt Chips */}
          <div className={styles.heroPromptChipsRow}>
            <span className={styles.heroTrendingLabel}>Trending:</span>
            <div className={styles.heroChipsList}>
              {QUICK_PROMPTS.map((chip) => (
                <button
                  key={chip.query}
                  type="button"
                  onClick={() => handleChipClick(chip.query)}
                  className={styles.heroPromptChip}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Cinematic Visual Frame with Destination Switcher */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={styles.heroVisualShowcase}
        >
          {/* Main Visual Image Window */}
          <div className={styles.heroVisualWindow}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeDest.id}
                src={activeDest.img || heroBgImage}
                alt={activeDest.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={styles.heroVisualImage}
                fetchPriority="high"
                decoding="async"
              />
            </AnimatePresence>

            {/* Visual Glass Overlay & Content */}
            <div className={styles.heroVisualScrim}>
              <div className={styles.heroVisualInfo}>
                <span className={styles.heroVisualBadge}>
                  {activeDest.tag}
                </span>
                <h2 className={styles.heroVisualTitle}>
                  {activeDest.title}
                </h2>
                <p className={styles.heroVisualSubtitle}>
                  {activeDest.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleChipClick(activeDest.query)}
                className={styles.heroVisualExploreBtn}
              >
                <span>Plan this Journey</span>
                <ArrowRight size={14} weight="bold" />
              </button>
            </div>

            {/* Floating Trust Pills on Visual Frame */}
            <div className={styles.heroFloatingBadgeLeft}>
              <div className={styles.heroBadgeIconGold}>
                <Star size={16} weight="fill" />
              </div>
              <div>
                <strong className={styles.heroBadgeStrong}>4.9/5 Rating</strong>
                <span className={styles.heroBadgeSpan}>Over 12,000+ Journeys</span>
              </div>
            </div>

            <div className={styles.heroFloatingBadgeRight}>
              <div className={styles.heroBadgeIconTeal}>
                <ShieldCheck size={16} weight="fill" />
              </div>
              <div>
                <strong className={styles.heroBadgeStrong}>28 States Covered</strong>
                <span className={styles.heroBadgeSpan}>Train & Roadtrip Smart</span>
              </div>
            </div>
          </div>

          {/* Interactive Showcase Tabs */}
          <div className={styles.heroTabsRow} role="tablist" aria-label="Featured destinations">
            {HERO_DESTINATIONS.map((dest, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={dest.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(idx)}
                  className={`${styles.heroTabBtn} ${isActive ? styles.heroTabBtnActive : ''}`}
                >
                  <span className={styles.heroTabNumber}>0{idx + 1}</span>
                  <span className={styles.heroTabTitle}>{dest.title.split(',')[0]}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
