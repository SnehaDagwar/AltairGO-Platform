import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import logo from '../../assets/logo.png';

const Footer = () => {
  const cols = [
    { h: 'Product', items: ['AI Itinerary', 'Destinations', 'Group planning', 'Mobile app'] },
    { h: 'Company', items: ['About us', 'Careers', 'Press', 'Contact', 'Partners'] },
    { h: 'Resources', items: ['Travel guides', 'Visa help', 'Blog', 'Community', 'Support'] },
    { h: 'Legal', items: ['Privacy', 'Terms', 'Refund policy', 'Cookie policy', 'GST details'] }
  ];

  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={styles.container}
      >
        {/* Custom SVG Jagged Mountain Range Silhouette Top Edge Cutout */}
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none" 
          style={{ 
            position: 'absolute', 
            top: -1, 
            left: 0, 
            width: '100%', 
            height: '48px', 
            zIndex: 3, 
            pointerEvents: 'none' 
          }}
        >
          <path 
            d="M0,0 L0,45 L80,55 L160,35 L240,65 L320,40 L400,75 L480,50 L560,85 L640,45 L720,70 L800,35 L880,60 L960,30 L1040,75 L1120,45 L1200,80 L1280,35 L1360,65 L1440,25 L1440,0 Z" 
            fill="var(--page-bg)" 
          />
        </svg>

        {/* Cinematic Kashmiri/Himalayan Mountain Backdrop with Slow Zoom Parallax */}
        <motion.img 
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cc3?auto=format&fit=crop&q=80&w=2070" 
          alt="Cinematic Himalayan Mountain Valley"
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            zIndex: 0 
          }} 
          animate={{ scale: [1, 1.06] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Soft Dark Teal/Neutral Scrim Layer for Impeccable Text Contrast */}
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(180deg, rgba(15, 25, 29, 0.45) 0%, rgba(15, 25, 29, 0.7) 40%, #080d0f 100%)', 
            zIndex: 1 
          }} 
        />

        {/* Brand logo & navigation structure */}
        <div className={styles.footerGrid}>
          <div className={styles.brandCol}>
            <div className={styles.brandLogo}>
              <img src={logo} alt="ALTAIRGO" className={styles.footerLogo} />
            </div>
            <p className={styles.brandDesc}>
              An AI trip planner, made in India, for travelers who want to spend less time planning and more time being there.
            </p>
            <div className={styles.contactInfo}>
              <a href="mailto:hello@altairgo.in" className={styles.email}>hello@altairgo.in</a>
              <div className={styles.locations}>Bengaluru · Mumbai · Delhi</div>
            </div>
          </div>

          {cols.map((c, i) => (
            <div key={i} className={styles.linksCol}>
              <div className={styles.colTitle}>{c.h}</div>
              <div className={styles.linksList}>
                {c.items.map((it, j) => (
                  <a key={j} className={styles.footerLink}>{it}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Credit Area */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>© 2026 Altairgo Intelligence Pvt. Ltd. · All rights reserved.</div>
          <div className={styles.vCredit}>
            <span>Made in 🇮🇳 with चाय</span>
            <span>v1.0 · 2026</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
