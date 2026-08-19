import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Sparkle, MapTrifold, Signpost, CloudSun, Compass as CompassPhosphor } from '@phosphor-icons/react';
import styles from './Home.module.css';
import heroLightBg from '../assets/hero-light-bg.jpg';
import luxuryResortImg from '../assets/luxury-resort.jpg';
import destGoa from '../assets/dest-goa.png';
import destKashmir from '../assets/dest-kashmir.png';
import destRajasthan from '../assets/dest-rajasthan.png';
import destKerala from '../assets/dest-kerala.png';
import destHimachal from '../assets/dest-himachal.png';
import destMeghalayaNew from '../assets/meghalaya-bridges.jpg';
import destUdaipur from '../assets/udaipur-palace.jpg';
import destMunnar from '../assets/munnar-tea.jpg';
import destHampi from '../assets/hampi-ruins.jpg';
import destAndaman from '../assets/andaman-islands.jpg';
import destLadakh from '../assets/ladakh.jpg';
import destJaipurHawa from '../assets/jaipur-hawa.jpg';
import journalKerala from '../assets/journal_kerala.png';
import journalHimachal from '../assets/journal_himachal.png';
import journalVaranasi from '../assets/journal_varanasi.png';
import destGokarna from '../assets/gokarna-cliffs.jpg';
import destOoty from '../assets/ooty-lake.jpg';
import destJaisalmerNew from '../assets/jaisalmer-desert-camel.jpg';
import destDarjeelingNew from '../assets/darjeeling-tea-pickers.jpg';
import destRishikesh from '../assets/rishikesh-yoga.jpg';
import destKashmirNew from '../assets/kashmir.jpg';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';

/* ---------- Minimal inline strokes Icons ---------- */
const I = {
  chev: (p) => <svg width="10" height="10" viewBox="0 0 10 10" {...p}><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  arrow: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><path d="M2.5 6h7M6 2.5L9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  plus: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>,
  pin: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><path d="M6 1.5c-2 0-3.5 1.5-3.5 3.4c0 2.4 3.5 5.6 3.5 5.6s3.5-3.2 3.5-5.6C9.5 3 8 1.5 6 1.5z" stroke="currentColor" strokeWidth="1.1" fill="none" /><circle cx="6" cy="5" r="1.2" fill="currentColor" /></svg>,
  clock: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.1" fill="none" /><path d="M6 3.5V6l1.8 1.2" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" /></svg>,
  plane: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><path d="M1.5 6.5l3 0.3l1.8 2.7l0.9-0.2l-1-3l2.8 0.3l1.1-1l-2.7-1.1l-0.9-3l-0.9 0.2l-0.4 3l-3.1 0.5z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round" /></svg>,
  bed: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><path d="M1.5 8.5V3.5M1.5 6h9v2.5M10.5 6V5a1 1 0 00-1-1H5.5v2" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" /><circle cx="3.5" cy="5.3" r="0.9" stroke="currentColor" strokeWidth="1" fill="none" /></svg>,
  fork: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><path d="M3.5 1.5v3.2a1.5 1.5 0 003 0V1.5M5 4.5v6M8.5 1.5c-.8 0-1.5.7-1.5 1.5v3h1.5v4.5" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" /></svg>,
  star: (p) => <svg width="10" height="10" viewBox="0 0 10 10" {...p}><path d="M5 1L6.2 3.7L9 4.1L7 6.1L7.5 9L5 7.6L2.5 9L3 6.1L1 4.1L3.8 3.7Z" fill="currentColor" /></svg>,
  spark: (p) => <svg width="14" height="14" viewBox="0 0 14 14" {...p}><path d="M7 1.5L8.2 5.3L12 6.5L8.2 7.7L7 11.5L5.8 7.7L2 6.5L5.8 5.3Z" fill="currentColor" /></svg>,
};

/* ---------- Hero (Bright Minimal Light Theme) ---------- */
function Hero({ onPlan }) {
  return (
    <div style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', background: 'var(--color-cream)', width: '100%', overflow: 'hidden' }}>
      {/* Background Image & Scrim Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img 
          src={heroLightBg} 
          alt="Pristine Udaipur Lake Palace at Golden Morning" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%' }} 
        />
        {/* Layer 1: Radial soft cream overlay for bright/minimal light theme legibility */}
        <div className={styles.heroOverlayHorizontal} />
        {/* Layer 2: Top-to-bottom soft cream gradient for navbar and section transition */}
        <div className={styles.heroOverlayVertical} />
      </div>

      {/* Hero Content Area */}
      <div className={styles.heroContentContainer}>
        <div className={styles.heroTextColMinimal}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
          >
            <div className={styles.heroHeadlineGroup}>
              <h1 className={styles.heroHeadline}>Discover More</h1>
              <div className={styles.heroHeadlineCursive}>Than Destinations</div>
            </div>
            
            <div className={styles.heroDivider}>
              <div className={styles.heroDividerLine}></div>
              <I.spark className={styles.heroDividerIcon} width="20" height="20" />
              <div className={styles.heroDividerLine}></div>
            </div>

            <p className={styles.heroSubheadline}>
              AI-powered itineraries, intelligent trip planning, seamless bookings, and travel insights designed around the way you explore.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ marginTop: 40 }}
          >
            <button className={styles.heroCtaBtn} onClick={onPlan}>
              <div className={styles.heroCtaIcon}>
                <CompassPhosphor size={16} weight="regular" />
              </div>
              <span>Start Your Journey</span>
              <I.arrow />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Animated Counter component for Stats ---------- */
function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(value);
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) {
      return;
    }
    const match = value.match(/^([$]?)([0-9.]+)([a-zA-Z%+]*)$/);
    if (!match) {
      return;
    }
    const [_, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    let start = 0;
    const startTime = performance.now();
    let animationFrameId;

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress * (2 - progress);
      const currentVal = start + easeProgress * (target - start);
      
      const formatted = numStr.includes('.') 
        ? currentVal.toFixed(1) 
        : Math.floor(currentVal).toString();

      setCount(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isIntersecting, value, duration]);

  return <span ref={ref}>{count || value}</span>;
}

/* ---------- Window Size Hook for Dynamic Responsiveness ---------- */
function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

/* ---------- Why Altairgo ---------- */
function WhyAltairgo({ isMobile, isTablet }) {

  const cards = [
    { 
      value: 'AI', 
      title: 'AI-Powered Itineraries', 
      desc: 'Smarter journeys tailored to your vibe, budget, and travel style',
      icon: Sparkle
    },
    { 
      value: '28', 
      title: '28 States Covered', 
      desc: 'Curated experiences across mountains, beaches, cities, and hidden gems',
      icon: MapTrifold
    },
    { 
      value: 'Smart', 
      title: 'Train + Roadtrip Smart', 
      desc: 'Real-world routing built around Indian travel patterns and flexibility',
      icon: Signpost
    },
    { 
      value: 'Live', 
      title: 'Season & Weather Aware', 
      desc: 'Travel recommendations optimized for monsoons, festivals, and peak seasons',
      icon: CloudSun
    }
  ];

  return (
    <section style={{ width: '100%', background: 'var(--page-bg)', overflow: 'hidden' }}>
      <div className={styles.sectionContainer} style={{ paddingTop: isMobile ? '60px' : '120px', paddingBottom: isMobile ? '60px' : '120px' }}>
        <div className={styles.responsiveGrid} style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 60, alignItems: 'center' }}>
          
          {/* Left Side: Content & Feature Cards */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.15, letterSpacing: '-0.02em', fontWeight: 600, margin: '0 0 24px 0', color: 'var(--fg)' }}>
              Unlock Smarter Indian Journeys
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65, color: 'var(--fg)', opacity: 0.85, margin: '0 0 32px 0', maxWidth: 480 }}>
              Altairgo helps you explore India smarter — from scenic road trips and train journeys to hidden escapes and cultural adventures. Personalized AI-powered itineraries designed for the way India actually travels.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
              {cards.map((card, i) => (
                <Card 
                  key={i} 
                  variant="default"
                  hover={true} 
                  style={{ padding: isMobile ? '24px 20px' : '32px 24px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <motion.div 
                      whileHover={{ scale: 1.12, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        width: 44, 
                        height: 44, 
                        borderRadius: 'var(--radius-sm)', 
                        background: 'rgba(108, 176, 189, 0.12)', 
                        border: '1px solid rgba(108, 176, 189, 0.25)', 
                        color: 'var(--color-teal)',
                        cursor: 'pointer'
                      }}
                    >
                      <card.icon size={22} weight="duotone" />
                    </motion.div>
                    <div style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-teal)', letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>
                      <AnimatedCounter value={card.value} />
                    </div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg)', marginBottom: 6, lineHeight: 1.3, fontFamily: 'var(--font-body)' }}>
                    {card.title}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 400, lineHeight: 1.4, fontFamily: 'var(--font-body)' }}>
                    {card.desc}
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', height: isMobile ? 380 : (isTablet ? 480 : 640), display: 'flex', gap: isMobile ? 12 : 24, padding: isMobile ? '0px' : '20px' }}
          >
            {/* Subtle decorative dashed data path overlay */}
            <svg style={{ position: 'absolute', top: '-10%', left: '-20%', width: '140%', height: '120%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 500 500">
              <path d="M 0 100 Q 200 -50 400 150 T 500 450" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round" style={{ opacity: 0.3 }} />
              <path d="M 100 450 Q 300 550 450 300 T 500 100" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round" style={{ opacity: 0.3 }} />
            </svg>

            {/* Left Column (Two Stacked Images) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 24, position: 'relative', zIndex: 1 }}>
               <motion.img 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.4 }}
                src={journalKerala} 
                alt="Kerala Backwaters Serene View" 
                style={{ width: '100%', height: isMobile ? 160 : 280, objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}
               />
               <motion.img 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.4 }}
                src="https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1000&auto=format&fit=crop" 
                alt="Desert Dunes Sunset" 
                style={{ width: '100%', height: isMobile ? 160 : 280, objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}
               />
            </div>

            {/* Right Column (Single Tall Image) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1, paddingTop: isMobile ? 30 : 60 }}>
               <motion.img 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.4 }}
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop" 
                alt="Cinematic Himalayan Peaks" 
                style={{ width: '100%', height: isMobile ? 260 : 460, objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}
               />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ / Questions Section ---------- */
const FAQS = [
  { q: "How does the AI trip planner create my itinerary?", a: "Our AI analyzes your budget, travel style, interests, trip duration, and destination preferences to generate a personalized travel plan within seconds.", bg: destKashmir },
  { q: "Can I customize the itinerary generated by AI?", a: "Yes. You can fully edit destinations, activities, hotels, transport options, and trip duration anytime after the itinerary is generated.", bg: destRajasthan },
  { q: "Will my itinerary update if my plans change?", a: "Yes. You can instantly regenerate or modify your itinerary anytime if your travel dates, destination, or preferences change.", bg: destKerala },
  { q: "How quickly can the AI generate a trip plan?", a: "Most personalized itineraries are generated in just a few seconds depending on the complexity of the trip.", bg: destGoa },
  { q: "Does the AI help manage my travel budget?", a: "Yes. The planner provides estimated costs for hotels, transport, activities, and food to help you stay within your budget.", bg: journalVaranasi }
];

function FAQ({ isMobile, isTablet }) {
  const [activeFaq, setActiveFaq] = useState(0);

  const h2FontSize = isMobile ? '28px' : isTablet ? '36px' : '44px';
  const cursiveFontSize = isMobile ? '34px' : isTablet ? '42px' : '52px';
  const sectionPadding = isMobile ? '60px' : isTablet ? '80px' : '120px';
  const headerMarginBottom = isMobile ? 24 : isTablet ? 32 : 40;
  const itemPadding = isMobile ? '14px 16px' : isTablet ? '18px 22px' : '20px 28px';
  const questionFontSize = isMobile ? '14px' : isTablet ? '15px' : '17px';
  const answerFontSize = isMobile ? '13px' : isTablet ? '14px' : '15px';
  const answerPaddingLeft = isMobile ? 24 : isTablet ? 28 : 36;
  const triggerSize = isMobile ? 32 : isTablet ? 36 : 44;

  return (
    <section style={{ width: '100%', borderTop: '1px solid var(--line)', background: 'var(--page-bg)', overflow: 'hidden' }}>
      <div className={styles.sectionContainer} style={{ paddingTop: sectionPadding, paddingBottom: sectionPadding }}>
        <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 60, alignItems: 'start' }} className={styles.responsiveGrid}>
          
          {/* Left Side: Floating Image Collage (Hidden on Tablet & Mobile to ensure comfortable layout spacing) */}
          {!isTablet && (
            <div style={{ position: 'relative', width: '100%', maxWidth: 440, aspectRatio: '440/640', margin: '0 auto', display: 'block' }}>
              <img 
                src={destKashmir} 
                alt="Scenic view of Kashmir valley"
                style={{ position: 'absolute', top: '0%', left: '0%', width: '50%', height: '50%', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', zIndex: 1 }} 
              />
              <img 
                src={destRajasthan} 
                alt="Intricately styled palace in Rajasthan"
                style={{ position: 'absolute', top: '28%', left: '36%', width: '54.5%', height: '43.7%', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', zIndex: 2 }} 
              />
              <img 
                src={destKerala} 
                alt="Tranquil backwaters houseboats in Kerala"
                style={{ position: 'absolute', top: '53%', left: '4.5%', width: '45.4%', height: '40.6%', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', zIndex: 3 }} 
              />
              <img 
                src={destGoa} 
                alt="Golden sand beach of Goa"
                style={{ position: 'absolute', top: '81%', left: '41%', width: '36.3%', height: '17.1%', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', zIndex: 4 }} 
              />
            </div>
          )}

          {/* Right Side: Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ marginBottom: headerMarginBottom }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: h2FontSize, lineHeight: 1.15, letterSpacing: '-0.02em', fontWeight: 600, color: 'var(--fg)', margin: 0 }}>
                Still Have Questions? We've Got <span style={{ fontFamily: 'var(--font-accent)', fontSize: cursiveFontSize, color: 'var(--accent)', textTransform: 'none', display: 'inline-block', transform: 'rotate(-2deg)', marginLeft: 6, marginRight: 2 }}>Answers</span>
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FAQS.map((faq, i) => {
                const isActive = activeFaq === i;
                return (
                  <div
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    onClick={() => setActiveFaq(isActive ? null : i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveFaq(isActive ? null : i);
                      }
                    }}
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      padding: itemPadding,
                      display: 'flex',
                      flexDirection: 'column',
                      background: isActive ? 'var(--surface)' : 'var(--glass-bg)',
                      boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                      transition: 'background-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    {/* Header Row */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                      <h3 style={{ fontFamily: 'var(--font-body)', fontSize: questionFontSize, fontWeight: isActive ? 500 : 400, margin: 0, display: 'flex', gap: 12, alignItems: 'center', color: 'var(--fg)', transition: 'font-weight 0.25s ease' }}>
                        <span style={{ opacity: isActive ? 0.9 : 0.5, fontWeight: 600, color: isActive ? 'var(--accent)' : 'var(--fg)' }}>0{i + 1}.</span> 
                        {faq.q}
                      </h3>
                      
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        style={{
                          width: triggerSize, height: triggerSize, borderRadius: 'var(--radius-pill)', flexShrink: 0,
                          display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-sm)',
                          backgroundColor: isActive ? 'var(--fg)' : 'var(--surface)',
                          color: isActive ? 'var(--bg)' : 'var(--fg)',
                          transition: 'background-color 0.2s ease, color 0.2s ease'
                        }}
                      >
                        <I.chev style={{ width: isMobile ? 10 : isTablet ? 12 : 14, height: isMobile ? 10 : isTablet ? 12 : 14, strokeWidth: 2 }} />
                      </motion.div>
                    </div>

                    {/* Answer Content */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ zIndex: 1, marginTop: 12, paddingLeft: answerPaddingLeft, maxWidth: 500 }}>
                        <p style={{ margin: 0, fontSize: answerFontSize, lineHeight: 1.6, color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Travel Inspiration ---------- */
const INSPIRATION_CARDS = [
  {
    id: 'adventure',
    title: 'Adventure Trails',
    subtitle: 'Himalayan hikes, Ladakh roads, Meghalaya escapes',
    img: journalHimachal,
    gridClass: styles.inspirationCardVertical
  },
  {
    id: 'beach',
    title: 'Beach Escapes',
    subtitle: 'Goa, Andaman, Gokarna, Kerala coastlines',
    img: destGoa,
    gridClass: styles.inspirationCardHorizontal
  },
  {
    id: 'cultural',
    title: 'Cultural Journeys',
    subtitle: 'Jaipur, Varanasi, Hampi, spiritual circuits',
    img: journalVaranasi,
    gridClass: ''
  },
  {
    id: 'luxury',
    title: 'Luxury Retreats',
    subtitle: 'Palaces, wellness resorts, curated stays',
    img: luxuryResortImg,
    gridClass: ''
  }
];

function TravelInspiration({ isMobile, isTablet }) {
  const navigate = useNavigate();

  return (
    <section style={{ width: '100%', borderTop: '1px solid var(--line)', background: 'var(--page-bg)', overflow: 'hidden' }}>
      <div className={styles.sectionContainer} style={{ paddingTop: isMobile ? '60px' : '120px', paddingBottom: isMobile ? '60px' : '120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1.6fr', gap: isMobile ? 40 : 64, alignItems: 'center' }} className={styles.responsiveGrid}>
          
          {/* Left Side Content */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className={styles.mono} style={{ marginBottom: 16, fontSize: 13, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Explore with AltairGO
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.15, letterSpacing: '-0.02em', fontWeight: 600, margin: '0 0 24px 0', color: 'var(--fg)' }}>
              Travel India <br/><span style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-teal)', fontWeight: 'normal', fontSize: '1.15em', textTransform: 'none' }}>Your Way</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 32px 0', maxWidth: 460 }}>
              From Himalayan adventures and spiritual trails to luxury escapes and coastal getaways, AltairGO helps you discover journeys tailored to your vibe, budget, season, and travel style.
            </p>
            <Button variant="secondary" onClick={() => navigate('/discover')}>
              Explore All Journeys <I.arrow />
            </Button>
          </motion.div>

          {/* Right Side Card Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={styles.inspirationGrid}
          >
            {INSPIRATION_CARDS.map((card) => {
              return (
                <motion.article 
                  key={card.id}
                  whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={card.gridClass}
                  style={{ 
                    position: 'relative',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                    background: 'var(--glass-bg)'
                  }}
                >
                  <motion.img 
                    src={card.img} 
                    alt={card.title} 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ 
                    position: 'absolute', inset: 0, 
                    background: 'linear-gradient(to top, rgba(46,46,46,0.8) 0%, rgba(46,46,46,0) 60%)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: isMobile ? '16px' : '24px'
                  }}>
                    <h3 style={{ color: '#fff', fontSize: isMobile ? 18 : 22, fontWeight: 500, letterSpacing: '-0.01em', margin: '0 0 6px 0', textShadow: '0 2px 8px rgba(46,46,46,0.3)', fontFamily: 'var(--font-display)' }}>
                      {card.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, margin: 0, lineHeight: 1.4, fontWeight: 400, fontFamily: 'var(--font-body)' }}>
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

/* ---------- Explore India / Indian Destinations Carousel ---------- */
const TOURS = [
  { id: '01', title: 'Kashmir', img: destKashmirNew },
  { id: '02', title: 'Jaipur, Rajasthan', img: destJaipurHawa },
  { id: '03', title: 'Kerala Backwaters', img: destKerala },
  { id: '04', title: 'Goa Beaches', img: destGoa },
  { id: '05', title: 'Ladakh', img: destLadakh },
  { id: '06', title: 'Taj Mahal, Agra', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop' },
  { id: '07', title: 'Varanasi Ghats', img: journalVaranasi },
  { id: '08', title: 'Andaman Islands', img: destAndaman },
  { id: '09', title: 'Hampi Ruins, Karnataka', img: destHampi },
  { id: '10', title: 'Munnar Tea Hills, Kerala', img: destMunnar },
  { id: '11', title: 'Udaipur Palace, Rajasthan', img: destUdaipur },
  { id: '12', title: 'Meghalaya Living Bridges', img: destMeghalayaNew },
  { id: '13', title: 'Rishikesh Yoga Valley', img: destRishikesh },
  { id: '14', title: 'Darjeeling Tea Estates', img: destDarjeelingNew },
  { id: '15', title: 'Jaisalmer Desert, Rajasthan', img: destJaisalmerNew },
  { id: '16', title: 'Shimla Ridge, Himachal', img: destHimachal },
  { id: '17', title: 'Ooty Lake Hills, Tamil Nadu', img: destOoty },
  { id: '18', title: 'Gokarna Cliffs, Karnataka', img: destGokarna }
];

/* ---------- Graceful Image Loader with Fallback & Lazy Loading ---------- */
function CarouselImage({ src, alt }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border)'
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, marginBottom: 12 }}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          AltairGO Journey
        </span>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--surface)' }}>
      {!loaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--surface)',
          overflow: 'hidden'
        }}>
          <span style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)',
            animation: 'altair-skeleton-shimmer 1400ms infinite linear',
          }} />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy" 
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity var(--duration-normal) var(--ease-standard)'
        }} 
      />
    </div>
  );
}

function TourSelection({ isMobile, isTablet }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(p => (p + 1) % TOURS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [active]);

  const handleNext = () => setActive(p => (p + 1) % TOURS.length);
  const handlePrev = () => setActive(p => (p - 1 + TOURS.length) % TOURS.length);

  const cardWidth = isMobile ? 250 : (isTablet ? 290 : 320);
  const cardHeight = isMobile ? 340 : (isTablet ? 400 : 440);
  const spacing = isMobile ? 90 : (isTablet ? 140 : 180);

  return (
    <section id="tour-selection" style={{ width: '100%', borderTop: '1px solid var(--line)', background: 'var(--page-bg)', overflow: 'hidden' }}>
      <div className={styles.sectionContainer} style={{ paddingTop: isMobile ? '60px' : '110px', paddingBottom: isMobile ? '60px' : '110px', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 60 }}
        >
          <h2 className={styles.sectionHeadline} style={{ fontSize: isMobile ? 32 : 44, lineHeight: 1.05, letterSpacing: '-0.02em', fontWeight: 600, margin: '0 auto', maxWidth: 760, color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>
            Explore our <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--color-teal)', fontWeight: 'normal', fontSize: '1.15em', textTransform: 'none' }}>Indian</span> destinations
          </h2>
        </motion.div>

        <div style={{ position: 'relative', height: isMobile ? 360 : 460, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '100vw', margin: '0 auto' }}>
          {TOURS.map((tour, i) => {
            let diff = i - active;
            const half = TOURS.length / 2;
            if (diff > half) {
              diff -= TOURS.length;
            } else if (diff < -half) {
              diff += TOURS.length;
            }
            const absDiff = Math.abs(diff);
            const isActive = diff === 0;
            
            let x = diff * spacing;
            let scale = 1 - (absDiff * 0.15);
            let zIndex = 10 - absDiff;
            let opacity = 1 - (absDiff * 0.25);
            let blur = absDiff > 0 ? 2 : 0;

            if (isMobile && absDiff > 1) {
              opacity = 0;
            } else if (absDiff > 2) {
              opacity = 0;
            }

            return (
              <motion.div
                key={tour.id}
                animate={{ x, scale, zIndex, opacity, filter: `blur(${blur}px)` }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                onClick={() => setActive(i)}
                style={{
                  position: 'absolute', width: cardWidth, height: cardHeight, borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                  cursor: isActive ? 'default' : 'pointer',
                  boxShadow: isActive ? 'var(--shadow-xl)' : 'var(--shadow-md)',
                  border: '1px solid var(--border)',
                  visibility: absDiff > (isMobile ? 1 : 2) ? 'hidden' : 'visible'
                }}
              >
                <CarouselImage src={tour.img} alt={tour.title} />
                
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'linear-gradient(to bottom, rgba(46,46,46,0.75) 0%, transparent 100%)', padding: isMobile ? '16px 12px 30px' : '24px 16px 40px', textAlign: 'center' }}>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: isMobile ? 16 : 18, fontWeight: 500, letterSpacing: '0.01em', textShadow: '0 2px 4px rgba(46,46,46,0.5)', fontFamily: 'var(--font-body)' }}>{tour.title}</h3>
                </div>
                
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', mixBlendMode: 'overlay' }}>
                  <span style={{ fontSize: isMobile ? 120 : 180, fontWeight: 300, color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.9)', fontFamily: 'var(--font-display)' }}>
                    {tour.id}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: isMobile ? 32 : 60, marginTop: 40 }}>
          <button 
            onClick={handlePrev} 
            className={styles.carouselNavBtn}
            style={{ 
              width: isMobile ? 44 : 56, 
              height: isMobile ? 44 : 56 
            }}
            aria-label="Previous destination"
          >
            <I.arrow style={{ transform: 'rotate(180deg)', width: isMobile ? 14 : 18, height: isMobile ? 14 : 18 }} />
          </button>

          <Button variant="secondary" onClick={() => navigate('/discover')} size={isMobile ? "sm" : "md"}>
            Explore Now <I.arrow />
          </Button>

          <button 
            onClick={handleNext} 
            className={styles.carouselNavBtn}
            style={{ 
              width: isMobile ? 44 : 56, 
              height: isMobile ? 44 : 56 
            }}
            aria-label="Next destination"
          >
            <I.arrow style={{ width: isMobile ? 14 : 18, height: isMobile ? 14 : 18 }} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Main Export Component ---------- */
export default function Home() {
  const navigate = useNavigate();
  const handlePlan = () => {
    navigate('/planner');
  };
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  return (
    <div className={styles.homeWrapper}>
      <Hero onPlan={handlePlan} />
      <WhyAltairgo isMobile={isMobile} isTablet={isTablet} />
      <TourSelection isMobile={isMobile} isTablet={isTablet} />
      <FAQ isMobile={isMobile} isTablet={isTablet} />
      <TravelInspiration isMobile={isMobile} isTablet={isTablet} />
    </div>
  );
}
