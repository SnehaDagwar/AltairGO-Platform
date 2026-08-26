import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button.jsx';
import { INSPIRATION_CARDS, Icons } from '../../constants/homeData.jsx';
import styles from '../../pages/Home.module.css';
import { RevealWords, FadeUp, Stagger, staggerItem } from '../common/TextReveal.jsx';

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
          <div className={styles.inspirationIntroCol}>
            <FadeUp as="div" className={styles.inspirationEyebrow} delay={0}>
              Explore with AltairGO
            </FadeUp>
            <RevealWords text="Travel India Your Way" as="h2" id="inspiration-heading" className={styles.inspirationHeading} stagger={0.07} />
            <FadeUp delay={0.18} className={styles.inspirationDescription} as="p">
              From Himalayan adventures and spiritual trails to luxury escapes and coastal getaways, AltairGO helps you discover journeys tailored to your vibe, budget, season, and travel style.
            </FadeUp>
            <FadeUp delay={0.28}>
              <Button variant="secondary" onClick={() => navigate('/discover')}>
                Explore All Journeys <Icons.Arrow />
              </Button>
            </FadeUp>
          </div>

          {/* Right Side Card Grid */}
          <Stagger 
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
                  variants={staggerItem}
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
                  className={`${styles.inspirationCard} ${cardClass}`}
                >
                  <img 
                    src={card.img} 
                    alt={card.title} 
                    loading="lazy"
                    decoding="async"
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
          </Stagger>

        </div>
      </div>
    </section>
  );
}
