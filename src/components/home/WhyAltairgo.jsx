import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card.jsx';
import AnimatedCounter from './AnimatedCounter.jsx';
import { WHY_ALTAIRGO_CARDS, COLLAGE_IMAGES } from '../../constants/homeData.jsx';
import styles from '../../pages/Home.module.css';

/**
 * WhyAltairgo Section
 * Highlighting AI routing, state coverage, and intelligent Indian travel patterns.
 */
export default function WhyAltairgo() {
  return (
    <section className={styles.whySection} aria-labelledby="why-altairgo-heading">
      <div className={styles.sectionContainer}>
        <div className={styles.whyGrid}>
          
          {/* Left Side: Content & Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={styles.whyContentCol}
          >
            <h2 id="why-altairgo-heading" className={styles.whyHeading}>
              Unlock Smarter Indian Journeys
            </h2>
            <p className={styles.whyDescription}>
              AltairGO helps you explore India smarter — from scenic road trips and train journeys to hidden escapes and cultural adventures. Personalized AI-powered itineraries designed for the way India actually travels.
            </p>

            <div className={styles.whyCardsGrid}>
              {WHY_ALTAIRGO_CARDS.map((card) => {
                const IconComponent = card.icon;
                return (
                  <Card 
                    key={card.id} 
                    variant="default"
                    hover={true} 
                    className={styles.whyFeatureCard}
                  >
                    <div className={styles.whyCardHeader}>
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className={styles.whyCardIconWrapper}
                        aria-hidden="true"
                      >
                        <IconComponent size={22} weight="duotone" />
                      </motion.div>
                      <span className={styles.whyCardValue}>
                        <AnimatedCounter value={card.value} />
                      </span>
                    </div>
                    <h3 className={styles.whyCardTitle}>
                      {card.title}
                    </h3>
                    <p className={styles.whyCardDesc}>
                      {card.desc}
                    </p>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side: Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={styles.whyCollageContainer}
          >
            {/* Subtle decorative dashed data path overlay */}
            <svg 
              className={styles.whyDashedPathSvg} 
              viewBox="0 0 500 500" 
              aria-hidden="true"
            >
              <path 
                d="M 0 100 Q 200 -50 400 150 T 500 450" 
                fill="none" 
                stroke="var(--border)" 
                strokeWidth="1.5" 
                strokeDasharray="6 8" 
                strokeLinecap="round" 
                style={{ opacity: 0.35 }} 
              />
              <path 
                d="M 100 450 Q 300 550 450 300 T 500 100" 
                fill="none" 
                stroke="var(--border)" 
                strokeWidth="1.5" 
                strokeDasharray="6 8" 
                strokeLinecap="round" 
                style={{ opacity: 0.35 }} 
              />
            </svg>

            {/* Left Column (Two Stacked Images) */}
            <div className={styles.whyCollageLeftCol}>
              <motion.img 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                src={COLLAGE_IMAGES.kerala} 
                alt="Kerala Backwaters Serene View" 
                className={styles.whyCollageImgTop}
                loading="lazy"
                decoding="async"
              />
              <motion.img 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                src={COLLAGE_IMAGES.desert} 
                alt="Golden Desert Dunes Sunset in Rajasthan" 
                className={styles.whyCollageImgBottom}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Right Column (Single Tall Image) */}
            <div className={styles.whyCollageRightCol}>
              <motion.img 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                src={COLLAGE_IMAGES.mountains} 
                alt="Cinematic Himalayan Peaks in Himachal" 
                className={styles.whyCollageImgTall}
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
