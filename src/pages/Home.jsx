import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import styles from './Home.module.css';
import logoUrl from '../assets/logo.png';
import heroBg from '../assets/hero-bg.jpg';
import philJaipur from '../assets/phil-jaipur.png';
import philKerala from '../assets/phil-kerala.png';
import philGoa from '../assets/phil-goa.png';
import philHimalayas from '../assets/phil-himalayas.png';
import destGoa from '../assets/dest-goa.png';
import destKashmir from '../assets/dest-kashmir.png';
import destKashmir2 from '../assets/dest-kashmir-2.png';
import destRajasthan from '../assets/dest-rajasthan.png';
import destKerala from '../assets/dest-kerala.png';
import destHimachal from '../assets/dest-himachal.png';
import destMeghalaya from '../assets/dest-meghalaya.png';
import journalJaipur from '../assets/journal_jaipur.png';
import journalKerala from '../assets/journal_kerala.png';
import journalHimachal from '../assets/journal_himachal.png';
import journalMumbai from '../assets/journal_mumbai.png';
import journalVaranasi from '../assets/journal_varanasi.png';
import journalMeghalaya from '../assets/journal_meghalaya.png';
import footerBg from '../assets/footer-bg.png';

/* ---------- Tweakable defaults ---------- */
const TWEAK_DEFAULTS = {
  "accentHue": 150,
  "headline": "The smarter way to plan your trips",
  "headlineItalic": "trips",
  "gradientIntensity": 0.3,
  "cardVariant": 1
};

const { headline, headlineItalic, gradientIntensity: intensity } = TWEAK_DEFAULTS;
const parts = headline.split(headlineItalic);

/* ---------- Icons (minimal inline strokes) ---------- */
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
  search: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><circle cx="5.3" cy="5.3" r="3.3" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M7.8 7.8L10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>,
  sun: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><circle cx="6" cy="6" r="2.3" stroke="currentColor" strokeWidth="1.1" fill="none" /><path d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11M2.5 2.5l1 1M8.5 8.5l1 1M2.5 9.5l1-1M8.5 3.5l1-1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  moon: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><path d="M9.5 7.5A4 4 0 014.5 2.5A4 4 0 109.5 7.5z" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinejoin="round" /></svg>,
  close: (p) => <svg width="12" height="12" viewBox="0 0 12 12" {...p}><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
};

/* ---------- Logo ---------- */
function Logo({ onDark = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      <img src={logoUrl} alt="ALTAIRGO" style={{ height: 28, width: 'auto', display: 'block', filter: onDark ? 'invert(1) brightness(1.8)' : 'none' }} />
    </div>
  );
}


/* ---------- Gradient wash ---------- */
function Wash({ intensity }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1200 640" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <defs>
        <radialGradient id="w1" cx="0.22" cy="0.55" r="0.75">
          <stop offset="0" stopColor="var(--a3)" stopOpacity={0.55 * intensity} />
          <stop offset="0.5" stopColor="var(--a2)" stopOpacity={0.3 * intensity} />
          <stop offset="1" stopColor="var(--a1)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="w2" cx="0.08" cy="0.9" r="0.5">
          <stop offset="0" stopColor="var(--a2)" stopOpacity={0.4 * intensity} />
          <stop offset="1" stopColor="var(--a1)" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" stroke="var(--ink)" strokeOpacity="0.04" fill="none" />
        </pattern>
      </defs>
      <rect width="1200" height="640" fill="url(#w1)" />
      <rect width="1200" height="640" fill="url(#w2)" />
      <rect width="1200" height="640" fill="url(#grid)" />
    </svg>
  );
}

/* ---------- Itinerary card variants ---------- */
const CARD_DATA = [
  {
    dest: 'Jaipur, Rajasthan',
    tag: 'Royal Heritage',
    blurb: 'Five unhurried days through palaces, stepwells, and the old bazaars of the Pink City — paced for rooftop chai mornings and havelis by night.',
    meta: [{ i: 'plane', t: 'Flight incl.' }, { i: 'bed', t: '2 havelis' }, { i: 'clock', t: '5 days' }],
    days: [
      { d: 'Mon', l: 'Amber Fort at sunrise', c: 'fort' },
      { d: 'Tue', l: 'Hawa Mahal & Jantar Mantar', c: 'heritage' },
      { d: 'Wed', l: 'Chand Baori stepwell', c: 'nature' },
      { d: 'Thu', l: 'Johari Bazaar + thali', c: 'food' },
      { d: 'Fri', l: 'Nahargarh & departure', c: 'fort' }
    ]
  },
  {
    dest: 'Kerala Backwaters',
    tag: 'Slow Coastal',
    blurb: 'A long weekend on a kettuvallam through Alleppey, with one day pulled out to the tea hills of Munnar and Ayurveda on Marari beach.',
    meta: [{ i: 'plane', t: 'Flight incl.' }, { i: 'bed', t: 'Houseboat + resort' }, { i: 'clock', t: '4 days' }],
    days: [
      { d: 'Fri', l: 'Kochi — Fort & Jew Town', c: 'walk' },
      { d: 'Sat', l: 'Alleppey houseboat', c: 'water' },
      { d: 'Sun', l: 'Munnar tea gardens', c: 'nature' },
      { d: 'Mon', l: 'Marari beach & fly out', c: 'beach' }
    ]
  },
  {
    dest: 'Leh-Ladakh',
    tag: 'High Himalaya',
    blurb: 'A week across moonscapes, monasteries, and the Nubra dunes — acclimatize in Leh, then climb to Pangong and back through Khardung La.',
    meta: [{ i: 'plane', t: 'Flight incl.' }, { i: 'bed', t: 'Homestay + camp' }, { i: 'clock', t: '7 days' }],
    days: [
      { d: 'Sat', l: 'Leh arrival + rest', c: 'city' },
      { d: 'Sun', l: 'Shanti Stupa & old town', c: 'heritage' },
      { d: 'Mon', l: 'Hemis & Thiksey monasteries', c: 'temple' },
      { d: 'Tue', l: 'Khardung La → Nubra', c: 'mountain' },
      { d: 'Wed', l: 'Hunder dunes & camels', c: 'desert' },
      { d: 'Thu', l: 'Pangong Tso night', c: 'lake' },
      { d: 'Fri', l: 'Return & departure', c: 'city' }
    ]
  }
];

function ItineraryCard({ variant, onCycle }) {
  const data = CARD_DATA[variant % CARD_DATA.length];
  const [hover, setHover] = useState(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', maxWidth: '100%' }} className={`${styles.responsiveGrid} ${styles.cardWrapper}`}>
      {/* left: itinerary */}
      <div style={{ padding: '22px 22px 20px' }} className={styles.cardLeft}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--a2), var(--a3))', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 13, fontWeight: 600 }}>
              {data.dest.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{data.tag}</div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{data.dest}</div>
            </div>
          </div>
          <button onClick={onCycle} style={{ all: 'unset', cursor: 'pointer', fontSize: 10.5, fontFamily: 'var(--mono)', color: 'var(--ink-muted)', padding: '4px 8px', border: '1px solid var(--line)', borderRadius: 6 }}>
            {variant + 1}/3 →
          </button>
        </div>

        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.2, marginBottom: 8, letterSpacing: '-0.01em' }}>
          {data.dest.split(',')[0]} <span style={{ fontStyle: 'italic', color: 'var(--a3)' }}>itinerary</span>
        </div>
        <div style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-soft)', marginBottom: 16 }}>
          {data.blurb}
        </div>

        <div style={{ display: 'flex', gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: '1px dashed var(--line)' }}>
          {data.meta.map((m, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--ink-soft)' }}>
              {m.i === 'plane' && <I.plane />}
              {m.i === 'bed' && <I.bed />}
              {m.i === 'clock' && <I.clock />}
              {m.t}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {data.days.slice(0, 5).map((day, i) =>
            <div key={i}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px', borderRadius: 8, background: hover === i ? 'var(--a1)' : 'transparent', transition: 'background 0.15s' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', width: 28 }}>{day.d}</div>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--a3)' }} />
              <div style={{ fontSize: 12, color: 'var(--ink)', flex: 1 }}>{day.l}</div>
              <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-muted)' }}>{day.c}</div>
            </div>
          )}
        </div>
      </div>

      {/* right: map + details */}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', background: 'linear-gradient(160deg, var(--a1), #fff)', borderRadius: 14, height: 150, border: '1px solid var(--line)', overflow: 'hidden', marginBottom: 14 }}>
          {/* stylized map */}
          <svg viewBox="0 0 240 150" width="100%" height="100%">
            <defs>
              <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.7" fill="var(--ink)" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="240" height="150" fill="url(#dots)" />
            <path d="M0,100 Q40,80 80,95 T160,80 T240,90" stroke="var(--a3)" strokeWidth="1.2" fill="none" opacity="0.5" strokeDasharray="2 3" />
            <path d="M20,60 Q70,50 120,70 T220,50" stroke="var(--a2)" strokeWidth="1" fill="none" opacity="0.5" />
            {/* route */}
            <path d={
              variant === 0 ? "M60,100 C80,70 100,60 130,55 C160,50 180,70 195,85" :
                variant === 1 ? "M50,80 C80,60 120,65 150,70 C180,75 200,60 200,50" :
                  "M40,110 C60,90 90,70 120,60 C150,50 180,40 210,35 C195,60 180,80 160,100"
            } stroke="var(--a3)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {data.days.slice(0, 5).map((_, i) => {
              const pts = variant === 0 ? [[60, 100], [95, 75], [130, 55], [165, 60], [195, 85]] :
                variant === 1 ? [[50, 80], [90, 67], [130, 70], [170, 65], [200, 50]] :
                  [[40, 110], [85, 80], [130, 58], [180, 42], [210, 35]];
              const [x, y] = pts[i] || [0, 0];
              return <g key={i}>
                <circle cx={x} cy={y} r="4" fill="#fff" stroke="var(--a3)" strokeWidth="1.5" />
                <text x={x} y={y + 1.5} fontSize="5" fontFamily="var(--mono)" textAnchor="middle" fill="var(--a3)" fontWeight="600">{i + 1}</text>
              </g>;
            })}
          </svg>
          <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-muted)', background: 'rgba(255,255,255,0.7)', padding: '3px 7px', borderRadius: 6 }}>
            <I.pin /> {data.dest}
          </div>
        </div>

        <div style={{ fontSize: 11, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          AI suggestions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            { i: 'fork', t: 'Laxmi Misthan Bhandar thali', s: '+ ₹450 · Wed eve' },
            { i: 'star', t: 'Patrika Gate photo stop', s: '+ 1h · Thu am' },
            { i: 'spark', t: 'Block-printing workshop', s: '+ ₹1,200 · optional' }
          ].map((s, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', border: '1px solid var(--line)', borderRadius: 10, fontSize: 12 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--a1)', display: 'grid', placeItems: 'center', color: 'var(--a3)' }}>
                {s.i === 'fork' && <I.fork />}
                {s.i === 'star' && <I.star />}
                {s.i === 'spark' && <I.spark />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--ink)' }}>{s.t}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-muted)', fontFamily: 'var(--mono)' }}>{s.s}</div>
              </div>
              <I.plus style={{ color: 'var(--ink-muted)' }} />
            </div>
          )}
        </div>

        <button style={{ all: 'unset', cursor: 'pointer', marginTop: 14, padding: '10px', background: 'var(--a1)', color: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center', fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <I.spark /> Refine with AI
        </button>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero({ onPlan }) {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '12px', display: 'flex', flexDirection: 'column' }}>
      {/* Rounded Outer Container (Luxury Frame) */}
      <div style={{
        position: 'relative',
        flex: 1,
        borderRadius: '32px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 24px 64px -16px rgba(28,43,72,0.4)',
        background: 'var(--midnight)'
      }}>
        {/* Background Image & Immersive Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2000&auto=format&fit=crop" 
            alt="Pristine Twilight Resort Pool" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          {/* Subtle top/bottom gradient overlays to maintain maximum readability */}
          <div style={{ 
            position: 'absolute', inset: 0, 
            background: 'linear-gradient(to bottom, rgba(20,28,45,0.7) 0%, rgba(20,28,45,0.3) 50%, rgba(20,28,45,0.75) 100%)' 
          }} />
        </div>

        {/* Floating Organic Vector Waves in Corners for Premium Depth */}
        <svg style={{ position: 'absolute', right: '-40px', bottom: '12%', height: '70%', width: '35%', zIndex: 1, pointerEvents: 'none', transform: 'scaleX(-1)' }} viewBox="0 0 100 200">
          <path d="M0,200 C35,170 55,110 35,0" fill="none" stroke="rgba(255, 255, 255, 0.28)" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M12,200 C48,170 68,110 48,0" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.6" strokeLinecap="round" />
        </svg>

        <svg style={{ position: 'absolute', left: '-40px', top: '10%', height: '60%', width: '30%', zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 100 200">
          <path d="M0,200 C30,160 50,100 30,0" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" strokeLinecap="round" />
        </svg>

        {/* Smooth Organic Section Edge Transition at bottom */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 48, zIndex: 3, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,48 L1440,48 L1440,24 C1080,-8 360,-8 0,24 Z" fill="var(--bg)" />
          </svg>
        </div>

        {/* Hero Content Container */}
        <div className={`${styles.responsiveGrid} ${styles.sectionContainer}`} style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', height: '100%', flex: 1, justifyContent: 'space-between', paddingBlock: '120px 70px' }}>
          
          {/* Center Content: Giant Editorial Typography & Spacing */}
          <div style={{ textAlign: 'center', marginBlock: 'auto 0' }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ 
                fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 12vw, 154px)', lineHeight: 0.82, 
                letterSpacing: '0.08em', fontWeight: 400, margin: 0, color: '#ffffff',
                textTransform: 'uppercase', textShadow: '0 10px 40px rgba(20,28,45,0.45)'
              }}
            >
              ALTAIRGO
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <h2 style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(11px, 1.8vw, 13px)', fontWeight: 500, color: 'var(--cerulean)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 16 }}>
                India’s AI-First Travel Intelligence Platform
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: '#ffffff', maxWidth: 540, margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
                Bespoke journeys mapped to the rhythm of India. Spontaneous road trips, slow boutique havelis, and deep heritage itineraries structured seamlessly by real-time travel intelligence.
              </p>
            </motion.div>
          </div>

          {/* Bottom Area: Left Content Block & Floating Glass Stats Badge */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginTop: '80px',
            width: '100%',
            flexWrap: 'wrap',
            gap: '32px'
          }}>
            
            {/* Left Block: Breathtaking Editorial Signature Title & CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <h3 style={{ 
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 52px)', 
                  fontWeight: 400, color: '#ffffff', margin: 0, lineHeight: 0.85, 
                  letterSpacing: '-0.02em', textShadow: '0 4px 16px rgba(0,0,0,0.3)' 
                }}>
                  Traveling
                </h3>
                <span style={{ 
                  fontFamily: 'var(--font-accent)', display: 'block', fontWeight: 400, 
                  color: '#A1CAF1', fontSize: 'clamp(34px, 4.5vw, 48px)', 
                  margin: '-4px 0 0 8px', textTransform: 'none', 
                  textShadow: '0 4px 16px rgba(0,0,0,0.2)' 
                }}>
                  Beyond
                </span>
              </div>
              
              <button 
                onClick={onPlan} 
                style={{ 
                  all: 'unset', cursor: 'pointer', padding: '15px 30px', 
                  background: 'rgba(28, 43, 72, 0.65)', backdropFilter: 'var(--glass-blur)',
                  webkitBackdropFilter: 'var(--glass-blur)',
                  color: '#ffffff', borderRadius: 'var(--radius-full)', fontSize: 13.5, fontWeight: 500, 
                  display: 'inline-flex', alignItems: 'center', gap: 10, 
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' 
                }} 
                onMouseEnter={(e) => { 
                  e.currentTarget.style.background = 'rgba(28, 43, 72, 0.85)'; 
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }} 
                onMouseLeave={(e) => { 
                  e.currentTarget.style.background = 'rgba(28, 43, 72, 0.65)'; 
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                Booking Now <I.arrow />
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Animated Counter component for Stats ---------- */
function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState('');
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
      setCount(value);
      return;
    }
    
    const match = value.match(/^([$]?)([0-9.]+)([a-zA-Z%+]*)$/);
    if (!match) {
      setCount(value);
      return;
    }
    const [_, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    let start = 0;
    const startTime = performance.now();

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
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isIntersecting, value, duration]);

  return <span ref={ref}>{count || value}</span>;
}

/* ---------- Why Altairgo ---------- */
function WhyAltairgo() {
  const cards = [
    { 
      value: 'AI', 
      title: 'AI-Powered Itineraries', 
      desc: 'Smarter journeys tailored to your vibe, budget, and travel style',
      icon: (p) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    { 
      value: '28', 
      title: '28 States Covered', 
      desc: 'Curated experiences across mountains, beaches, cities, and hidden gems',
      icon: (p) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" y1="3" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="21" />
        </svg>
      )
    },
    { 
      value: 'Smart', 
      title: 'Train + Roadtrip Smart', 
      desc: 'Real-world routing built around Indian travel patterns and flexibility',
      icon: (p) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
          <circle cx="6" cy="19" r="3" />
          <circle cx="18" cy="5" r="3" />
          <path d="M9 19h4a5 5 0 0 0 5-5v-6" />
        </svg>
      )
    },
    { 
      value: 'Live', 
      title: 'Season & Weather Aware', 
      desc: 'Travel recommendations optimized for monsoons, festivals, and peak seasons',
      icon: (p) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    }
  ];

  return (
    <section className={styles.sectionContainer} style={{ paddingBlock: '120px', background: 'var(--page-bg)', overflow: 'hidden' }}>
      <div className={styles.responsiveGrid} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        
        {/* Left Side: Content & Feature Cards */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 48px)', lineHeight: 1.15, letterSpacing: '-0.02em', fontWeight: 500, margin: '0 0 24px 0', color: 'var(--ink)' }}>
            Unlock Smarter Indian Journeys
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-soft)', margin: '0 0 48px 0', maxWidth: 480 }}>
            Altairgo helps you explore India smarter — from scenic road trips and train journeys to hidden escapes and cultural adventures. Personalized AI-powered itineraries designed for the way India actually travels.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {cards.map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                style={{ 
                  background: 'var(--card)', 
                  borderRadius: 24, 
                  padding: '32px 24px', 
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--line)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = 'translateY(-6px)'; 
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; 
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)'; 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: 'var(--a1)', color: 'var(--a3)' }}>
                    <card.icon />
                  </div>
                  <div style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontFamily: 'var(--serif)', fontWeight: 600, color: 'var(--a3)', letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>
                    <AnimatedCounter value={card.value} />
                  </div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.3 }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', fontWeight: 400, lineHeight: 1.4 }}>
                  {card.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Image Collage */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', height: 640, display: 'flex', gap: 24, padding: '20px' }}
        >
          {/* Subtle decorative dashed data path overlay */}
          <svg style={{ position: 'absolute', top: '-10%', left: '-20%', width: '140%', height: '120%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 500 500">
            <path d="M 0 100 Q 200 -50 400 150 T 500 450" fill="none" stroke="var(--a1)" strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round" style={{ opacity: 0.3 }} />
            <path d="M 100 450 Q 300 550 450 300 T 500 100" fill="none" stroke="var(--a1)" strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round" style={{ opacity: 0.3 }} />
            <g transform="translate(380, 140) rotate(45)">
              <I.spark style={{ color: 'var(--a3)', filter: 'drop-shadow(0 0 8px var(--a3))', animation: 'spin 12s linear infinite' }} />
            </g>
          </svg>

          {/* Left Column (Two Stacked Images) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', zIndex: 1 }}>
             <motion.img 
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.4 }}
              src={journalKerala} 
              alt="Kerala Backwaters Serene View" 
              style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 32, boxShadow: 'var(--shadow-lg)', border: '1px solid var(--line)' }}
             />
             <motion.img 
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.4 }}
              src="https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1000&auto=format&fit=crop" 
              alt="Desert Dunes Sunset" 
              style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 32, boxShadow: 'var(--shadow-lg)', border: '1px solid var(--line)' }}
             />
          </div>

          {/* Right Column (Single Tall Image) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1, paddingTop: 60 }}>
             <motion.img 
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.4 }}
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop" 
              alt="Cinematic Himalayan Peaks" 
              style={{ width: '100%', height: 460, objectFit: 'cover', borderRadius: 32, boxShadow: 'var(--shadow-lg)', border: '1px solid var(--line)' }}
             />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function ImageCard({ img, loc, sub, style, rotate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotate: rotate + 2, zIndex: 20, transition: { duration: 0.2 } }}
      style={{
        position: 'absolute',
        width: 280,
        background: 'var(--card)',
        padding: '12px 12px 16px',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--line)',
        cursor: 'pointer',
        ...style
      }}
    >
      <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', height: 180, marginBottom: 14 }}>
        <img src={img} alt={loc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{loc}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.02em' }}>{sub}</div>
      </div>
    </motion.div>
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

function FAQ() {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <section className={styles.sectionContainer} style={{ paddingBlock: '120px', background: 'var(--page-bg)', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 60, alignItems: 'start' }}>
        
        {/* Left Side: Floating Image Collage */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 440, aspectRatio: '440/640', margin: '0 auto', display: 'block' }}>
          <motion.img 
            src={destKashmir} 
            animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '0%', left: '0%', width: '50%', height: '50%', objectFit: 'cover', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', zIndex: 1 }} 
          />
          <motion.img 
            src={destRajasthan} 
            animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '28%', left: '36%', width: '54.5%', height: '43.7%', objectFit: 'cover', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', zIndex: 2 }} 
          />
          <motion.img 
            src={destKerala} 
            animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '53%', left: '4.5%', width: '45.4%', height: '40.6%', objectFit: 'cover', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', zIndex: 3 }} 
          />
          <motion.img 
            src={destGoa} 
            animate={{ y: [0, 8, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '81%', left: '41%', width: '36.3%', height: '17.1%', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', zIndex: 4 }} 
          />
        </div>

        {/* Right Side: Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 44, lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600, color: 'var(--ink)' }}>
              Still Have Questions? We've Got Answers.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FAQS.map((faq, i) => {
              const isActive = activeFaq === i;
              return (
                <motion.div
                  key={i}
                  onClick={() => setActiveFaq(isActive ? null : i)}
                  layout
                  initial={false}
                  animate={{ 
                    borderRadius: isActive ? 32 : 999,
                    backgroundColor: isActive ? 'transparent' : 'var(--card)',
                    color: isActive ? '#fff' : 'var(--ink)'
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--line)',
                    padding: isActive ? '32px 32px 40px' : '16px 20px 16px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: isActive ? 220 : 76
                  }}
                >
                  {/* Background Image for Active State */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
                    >
                      <img src={faq.bg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(20,28,45,0.85) 0%, rgba(20,28,45,0.4) 100%)' }} />
                    </motion.div>
                  )}

                  {/* Header Row */}
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 500, margin: 0, display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ opacity: isActive ? 0.9 : 0.5, fontWeight: 600 }}>0{i + 1}.</span> 
                      {faq.q}
                    </h3>
                    
                    <motion.div
                      layout
                      animate={{ 
                        rotate: isActive ? 180 : 0,
                        backgroundColor: isActive ? 'var(--card)' : 'var(--ink)',
                        color: isActive ? 'var(--ink)' : 'var(--card)'
                      }}
                      style={{
                        width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                        display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <I.chev style={{ width: 14, height: 14, strokeWidth: 2 }} />
                    </motion.div>
                  </div>

                  {/* Answer Content */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      style={{ position: 'relative', zIndex: 1, marginTop: 16, paddingLeft: 35, maxWidth: 500 }}
                    >
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
             <button style={{ all: 'unset', cursor: 'pointer', padding: '6px 6px 6px 24px', background: 'var(--card)', color: 'var(--ink)', borderRadius: 999, border: '1px solid var(--line)', fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 16, boxShadow: 'var(--shadow-sm)' }}>
                Ask a question
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ink)', color: 'var(--card)', display: 'grid', placeItems: 'center' }}>
                   <I.chev style={{ transform: 'rotate(-90deg)', width: 12, height: 12 }} />
                </div>
             </button>
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
    img: philGoa,
    gridClass: ''
  }
];

function TravelInspiration() {
  const navigate = useNavigate();
  return (
    <section style={{ paddingBlock: '120px', borderTop: '1px solid var(--line)', background: 'var(--page-bg)' }} className={styles.sectionContainer}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, alignItems: 'center' }} className={styles.responsiveGrid}>
        
        {/* Left Side Content */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className={styles.mono} style={{ marginBottom: 16, fontSize: 13, color: 'var(--ink-soft)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Explore with AltairGO
          </div>
          <h2 style={{ fontSize: 'clamp(40px, 4.5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 500, margin: '0 0 24px 0', color: 'var(--ink)' }}>
            Travel India <br/><span style={{ fontFamily: 'var(--font-accent)', color: '#17A1CF', textTransform: 'none' }}>Your Way</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 40px 0', maxWidth: 460 }}>
            From Himalayan adventures and spiritual trails to luxury escapes and coastal getaways, AltairGO helps you discover journeys tailored to your vibe, budget, season, and travel style.
          </p>
          <motion.button 
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} 
            onClick={() => navigate('/discover')} 
            style={{ 
              all: 'unset', cursor: 'pointer', padding: '16px 28px', background: 'var(--card)', color: 'var(--ink)', 
              borderRadius: 999, fontSize: 15, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10, 
              border: '1px solid var(--ink)', boxShadow: 'var(--shadow-sm)', transition: 'background 0.2s, color 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--page-bg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--card)'; e.currentTarget.style.color = 'var(--ink)'; }}
          >
            Explore All Journeys <I.arrow style={{ width: 14, height: 14 }} />
          </motion.button>
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
                whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
                transition={{ duration: 0.3 }}
                className={card.gridClass}
                style={{ 
                  position: 'relative',
                  borderRadius: 'var(--radius-2xl)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow-md)',
                  background: 'var(--card)'
                }}
              >
                <motion.img 
                  src={card.img} 
                  alt={card.title} 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ 
                  position: 'absolute', inset: 0, 
                  background: 'linear-gradient(to top, rgba(20,28,45,0.85) 0%, rgba(20,28,45,0) 60%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px'
                }}>
                  <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', margin: '0 0 6px 0', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13.5, margin: 0, lineHeight: 1.4, fontWeight: 400 }}>
                    {card.subtitle}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}



/* ---------- Explore India / Indian Destinations Carousel ---------- */
const TOURS = [
  { id: '01', title: 'Kashmir', img: destKashmir },
  { id: '02', title: 'Jaipur, Rajasthan', img: destRajasthan },
  { id: '03', title: 'Kerala Backwaters', img: destKerala },
  { id: '04', title: 'Goa Beaches', img: destGoa },
  { id: '05', title: 'Ladakh', img: philHimalayas },
  { id: '06', title: 'Taj Mahal, Agra', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop' },
  { id: '07', title: 'Varanasi Ghats', img: journalVaranasi },
  { id: '08', title: 'Andaman Islands', img: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600&auto=format&fit=crop' },
  { id: '09', title: 'Hampi Ruins, Karnataka', img: 'https://images.unsplash.com/photo-1600100397986-c4eb1a473c9f?q=80&w=600&auto=format&fit=crop' },
  { id: '10', title: 'Munnar Tea Hills, Kerala', img: philKerala },
  { id: '11', title: 'Udaipur Palace, Rajasthan', img: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?q=80&w=600&auto=format&fit=crop' },
  { id: '12', title: 'Meghalaya Living Bridges', img: destMeghalaya },
  { id: '13', title: 'Rishikesh Yoga Valley', img: 'https://images.unsplash.com/photo-1545203144-7d21c33ea9ae?q=80&w=600&auto=format&fit=crop' },
  { id: '14', title: 'Darjeeling Tea Estates', img: 'https://images.unsplash.com/photo-1554124484-91689b9d3b5b?q=80&w=600&auto=format&fit=crop' },
  { id: '15', title: 'Jaisalmer Desert, Rajasthan', img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=600&auto=format&fit=crop' },
  { id: '16', title: 'Shimla Ridge, Himachal', img: destHimachal },
  { id: '17', title: 'Ooty Lake Hills, Tamil Nadu', img: 'https://images.unsplash.com/photo-1563242273-0f496338e3e7?q=80&w=600&auto=format&fit=crop' },
  { id: '18', title: 'Gokarna Cliffs, Karnataka', img: philGoa }
];

function TourSelection() {
  const [active, setActive] = useState(3);

  const handleNext = () => setActive(p => Math.min(p + 1, TOURS.length - 1));
  const handlePrev = () => setActive(p => Math.max(p - 1, 0));

  return (
    <section id="tour-selection" className={styles.sectionContainer} style={{ paddingBlock: '110px', borderTop: '1px solid var(--line)', background: 'var(--page-bg)', position: 'relative', overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <h2 className={styles.sectionHeadline} style={{ fontSize: 52, lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 500, margin: 0, maxWidth: 760, marginInline: 'auto' }}>
          Explore our <span style={{ fontFamily: 'var(--font-accent)', color: '#17A1CF', textTransform: 'none' }}>Indian</span> destinations
        </h2>
      </motion.div>

      <div style={{ position: 'relative', height: 460, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '100vw', margin: '0 auto' }}>
        {TOURS.map((tour, i) => {
          const diff = i - active;
          const absDiff = Math.abs(diff);
          const isActive = diff === 0;
          
          let x = diff * 180;
          let scale = 1 - (absDiff * 0.15);
          let zIndex = 10 - absDiff;
          let opacity = 1 - (absDiff * 0.15);
          let blur = absDiff > 0 ? 2 : 0;

          if (absDiff > 2) opacity = 0;

          return (
            <motion.div
              key={tour.id}
              animate={{ x, scale, zIndex, opacity, filter: `blur(${blur}px)` }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              onClick={() => setActive(i)}
              style={{
                position: 'absolute', width: 320, height: 440, borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                cursor: isActive ? 'default' : 'pointer',
                boxShadow: isActive ? '0 24px 48px rgba(0,0,0,0.2)' : '0 8px 24px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <img src={tour.img} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)', padding: '24px 16px 40px', textAlign: 'center' }}>
                <h3 style={{ color: '#fff', margin: 0, fontSize: 18, fontWeight: 500, letterSpacing: '0.01em', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{tour.title}</h3>
              </div>
              
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', mixBlendMode: 'overlay' }}>
                <span style={{ fontSize: 180, fontWeight: 300, color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.9)', fontFamily: 'var(--font-display)' }}>
                  {tour.id}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60, marginTop: 40 }}>
        <button 
          onClick={handlePrev} disabled={active === 0}
          style={{ 
            all: 'unset', cursor: active === 0 ? 'not-allowed' : 'pointer', width: 56, height: 56, 
            borderRadius: '50%', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', 
            color: 'var(--ink)', opacity: active === 0 ? 0.3 : 1, transition: 'all 0.2s ease', background: 'var(--card)', boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={(e) => { if(active !== 0) e.currentTarget.style.background = 'var(--a1)'; }}
          onMouseLeave={(e) => { if(active !== 0) e.currentTarget.style.background = 'var(--card)'; }}
        >
          <I.arrow style={{ transform: 'rotate(180deg)', width: 18, height: 18 }} />
        </button>

        <button 
          style={{ 
            all: 'unset', cursor: 'pointer', padding: '6px 6px 6px 24px', background: 'var(--card)', color: 'var(--ink)', borderRadius: 999, 
            border: '1px solid var(--line)', fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 20,
            boxShadow: 'var(--shadow-md)', transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Explore Now 
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--ink)', color: 'var(--card)', display: 'grid', placeItems: 'center' }}>
             <I.arrow style={{ width: 14, height: 14 }} />
          </div>
        </button>

        <button 
          onClick={handleNext} disabled={active === TOURS.length - 1}
          style={{ 
            all: 'unset', cursor: active === TOURS.length - 1 ? 'not-allowed' : 'pointer', width: 56, height: 56, 
            borderRadius: '50%', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', 
            color: 'var(--ink)', opacity: active === TOURS.length - 1 ? 0.3 : 1, transition: 'all 0.2s ease', background: 'var(--card)', boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={(e) => { if(active !== TOURS.length - 1) e.currentTarget.style.background = 'var(--a1)'; }}
          onMouseLeave={(e) => { if(active !== TOURS.length - 1) e.currentTarget.style.background = 'var(--card)'; }}
        >
          <I.arrow style={{ width: 18, height: 18 }} />
        </button>
      </div>
    </section>
  );
}





/* ---------- Newsletter / Waitlist CTA ---------- */
export default function Home() {
  const navigate = useNavigate();
  const handlePlan = () => {
    navigate('/planner');
  };

  return (
    <div className={styles.homeWrapper}>
      <Hero onPlan={handlePlan} />
      <WhyAltairgo />
      <TourSelection />
      <FAQ />
      <TravelInspiration />
    </div>
  );
}
