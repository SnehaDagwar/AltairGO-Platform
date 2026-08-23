import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button.jsx';
import { TOURS, Icons } from '../../constants/homeData.jsx';
import styles from '../../pages/Home.module.css';

/**
 * Graceful Image Loader with Fallback & Skeleton
 */
function CarouselImage({ src, alt }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div className={styles.carouselImgPlaceholder}>
        <Icons.ImagePlaceholder className={styles.carouselPlaceholderIcon} />
        <span className={styles.carouselPlaceholderText}>
          AltairGO Journey
        </span>
      </div>
    );
  }

  return (
    <div className={styles.carouselImgContainer}>
      {!loaded && (
        <div className={styles.carouselImgSkeleton} aria-hidden="true">
          <span className={styles.carouselSkeletonShimmer} />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy" 
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)} 
        className={`${styles.carouselImg} ${loaded ? styles.carouselImgLoaded : ''}`}
      />
    </div>
  );
}

/**
 * TourSelection 3D Interactive Carousel
 * Optimized with pause-on-hover, keyboard navigation, and lightweight rendering.
 */
export default function TourSelection() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TOURS.length;
  const carouselContainerRef = useRef(null);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay ticker with pause on interaction
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Keyboard navigation when focused inside carousel
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleCardClick = (index, tour) => {
    if (active === index) {
      navigate(`/discover?search=${encodeURIComponent(tour.title.split(',')[0])}`);
    } else {
      setActive(index);
    }
  };

  return (
    <section 
      id="tour-selection" 
      className={styles.tourSelectionSection}
      aria-label="Popular Indian Destinations Carousel"
    >
      <div className={styles.sectionContainer}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={styles.tourHeaderArea}
        >
          <h2 className={styles.tourSectionHeadline}>
            Explore our <span className={styles.tourSectionAccent}>Indian</span> destinations
          </h2>
          <p className={styles.tourSectionSubtext}>
            Hand-curated itineraries across high Himalayas, royal Rajasthan, lush backwaters, and pristine islands.
          </p>
        </motion.div>

        {/* 3D Carousel Stage */}
        <div 
          ref={carouselContainerRef}
          className={styles.carouselStage}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Destination cards carousel"
        >
          {TOURS.map((tour, i) => {
            let diff = i - active;
            const half = total / 2;
            if (diff > half) diff -= total;
            else if (diff < -half) diff += total;

            const absDiff = Math.abs(diff);
            const isActive = diff === 0;
            const isVisible = absDiff <= 2; // Only animate visible adjacent cards for maximum performance

            if (!isVisible) {
              return null; // Skip mounting offscreen elements entirely to keep DOM and render pipeline light
            }

            return (
              <motion.div
                key={tour.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${tour.title}, destination ${i + 1} of ${total}`}
                aria-current={isActive ? 'true' : undefined}
                className={`${styles.carouselCard} ${isActive ? styles.carouselCardActive : ''}`}
                style={{
                  '--card-diff': diff,
                  '--card-abs-diff': absDiff,
                  zIndex: 10 - absDiff,
                }}
                onClick={() => handleCardClick(i, tour)}
                whileHover={isActive ? { scale: 1.02 } : { scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              >
                <CarouselImage src={tour.img} alt={`${tour.title} landscape`} />
                
                {/* Gradient Header overlay */}
                <div className={styles.carouselCardOverlay}>
                  <h3 className={styles.carouselCardTitle}>{tour.title}</h3>
                  {tour.tag && <span className={styles.carouselCardTag}>{tour.tag}</span>}
                </div>
                
                {/* Large Background Numerals */}
                <div className={styles.carouselNumeralWrapper} aria-hidden="true">
                  <span className={styles.carouselNumeral}>
                    {tour.id}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className={styles.carouselControlsRow}>
          <button 
            type="button"
            onClick={handlePrev} 
            className={styles.carouselNavBtn}
            aria-label="Previous destination slide"
          >
            <Icons.Arrow style={{ transform: 'rotate(180deg)' }} />
          </button>

          <Button 
            variant="secondary" 
            onClick={() => navigate('/discover')}
          >
            Explore All Destinations <Icons.Arrow />
          </Button>

          <button 
            type="button"
            onClick={handleNext} 
            className={styles.carouselNavBtn}
            aria-label="Next destination slide"
          >
            <Icons.Arrow />
          </button>
        </div>
      </div>
    </section>
  );
}
