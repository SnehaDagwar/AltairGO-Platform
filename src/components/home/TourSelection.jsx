import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button.jsx';
import { TOURS, Icons } from '../../constants/homeData.jsx';
import styles from '../../pages/Home.module.css';
import { RevealWords, FadeUp } from '../common/TextReveal.jsx';

/**
 * Graceful Image Loader with Fallback & Skeleton
 */
function CarouselImage({ src, alt, priority = false }) {
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
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
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
  const [isVisible, setIsVisible] = useState(true);
  const total = TOURS.length;
  const carouselContainerRef = useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Pause autoplay when carousel is off-screen or tab hidden
  useEffect(() => {
    const el = carouselContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    const handleVisibility = () => {
      if (document.hidden) setIsVisible(false);
      else if (el) {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(inView);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Autoplay ticker with pause on interaction / off-screen / reduced-motion
  useEffect(() => {
    if (isPaused || !isVisible || prefersReducedMotion) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused, isVisible, prefersReducedMotion, handleNext]);

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

  const handleCardKeyDown = (e, index, tour) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(index, tour);
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
        <div className={styles.tourHeaderArea}>
          <RevealWords text="Explore our Indian destinations" as="h2" className={styles.tourSectionHeadline} stagger={0.06} />
          <FadeUp delay={0.2}>
            <p className={styles.tourSectionSubtext}>
              Hand-curated itineraries across high Himalayas, royal Rajasthan, lush backwaters, and pristine islands.
            </p>
          </FadeUp>
        </div>

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
            const isCardVisible = absDiff <= 2; // Only animate visible adjacent cards for maximum performance

            if (!isCardVisible) {
              return null; // Skip mounting offscreen elements entirely to keep DOM and render pipeline light
            }

            return (
              <div
                key={tour.id}
                role="button"
                tabIndex={0}
                aria-label={`${tour.title}, destination ${i + 1} of ${total}${isActive ? ', active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                className={`${styles.carouselCard} ${isActive ? styles.carouselCardActive : ''}`}
                style={{
                  '--card-diff': diff,
                  '--card-abs-diff': absDiff,
                  zIndex: 10 - absDiff,
                }}
                onClick={() => handleCardClick(i, tour)}
                onKeyDown={(e) => handleCardKeyDown(e, i, tour)}
              >
                <CarouselImage src={tour.img} alt={`${tour.title} landscape`} priority={isActive} />
                
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
              </div>
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
