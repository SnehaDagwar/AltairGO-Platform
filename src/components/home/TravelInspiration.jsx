import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button.jsx';
import { INSPIRATION_CARDS, Icons } from '../../constants/homeData.jsx';
import styles from '../../pages/Home.module.css';

/**
 * TravelInspiration Section
 * Interactive thematic categories (Adventure, Beach, Heritage, Luxury) linking directly to Discover.
 */
export default function TravelInspiration() {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate(`/discover?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className={styles.inspirationSection} aria-labelledby="inspiration-heading">
      <div className={styles.sectionContainer}>
        <div className={styles.inspirationGridContainer}>
          
          {/* Left Side Content */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, amount: 0.3 }} 
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={styles.inspirationIntroCol}
          >
            <div className={styles.inspirationEyebrow}>
              Explore with AltairGO
            </div>
            <h2 id="inspiration-heading" className={styles.inspirationHeading}>
              Travel India <br/>
              <span className={styles.inspirationHeadingAccent}>Your Way</span>
            </h2>
            <p className={styles.inspirationDescription}>
              From Himalayan adventures and spiritual trails to luxury escapes and coastal getaways, AltairGO helps you discover journeys tailored to your vibe, budget, season, and travel style.
            </p>
            <Button variant="secondary" onClick={() => navigate('/discover')}>
              Explore All Journeys <Icons.Arrow />
            </Button>
          </motion.div>

          {/* Right Side Card Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, amount: 0.3 }} 
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={styles.inspirationGrid}
            role="region"
            aria-label="Travel themes gallery"
          >
            {INSPIRATION_CARDS.map((card) => {
              const cardClass = card.isVertical 
                ? styles.inspirationCardVertical 
                : card.isHorizontal 
                  ? styles.inspirationCardHorizontal 
                  : styles.inspirationCardDefault;

              return (
                <motion.article 
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Explore ${card.title}: ${card.subtitle}`}
                  onClick={() => handleCardClick(card.queryParam)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(card.queryParam);
                    }
                  }}
                  whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`${styles.inspirationCard} ${cardClass}`}
                >
                  <motion.img 
                    src={card.img} 
                    alt={card.title} 
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={styles.inspirationImg}
                  />
                  <div className={styles.inspirationCardOverlay}>
                    <h3 className={styles.inspirationCardTitle}>
                      {card.title}
                    </h3>
                    <p className={styles.inspirationCardSubtitle}>
                      {card.subtitle}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
