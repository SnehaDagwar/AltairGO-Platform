import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  User, 
  Mail, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook 
} from 'lucide-react';
import Button from '../../common/Button.jsx';
import styles from './Footer.module.css';
import logo from '../../../assets/logo.png';
import connectionImg from '../../../assets/connection.webp';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Waitlist form state
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!trimmed || !emailValid) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
    toast.success("Welcome aboard! You've joined the Altairgo waitlist.");
  };

  // Determine path
  const path = location.pathname.toLowerCase();

  // CTA banner displayed on public marketing and discovery pages
  const showCTABanner = 
    path === '/' || 
    path === '/discover' || 
    path === '/blogs' || 
    path.startsWith('/destination/') || 
    path.startsWith('/blogs/');

  // Standard directories setup ('#' = page not yet built, render as inert placeholder)
  const exploreLinks = [
    { label: 'Destinations', link: '/discover' },
    { label: 'AI Planner', link: '/planner' },
    { label: 'Travel Guides', link: '/blogs' },
    { label: 'Experiences', link: '#' }
  ];

  const companyLinks = [
    { label: 'About', link: '/about' },
    { label: 'Contact', link: 'mailto:hello@altairgo.in' },
    { label: 'FAQs', link: '#' },
    { label: 'Privacy Policy', link: '#' }
  ];

  const resourcesLinks = [
    { label: 'Blog', link: '/blogs' },
    { label: 'Support', link: 'mailto:hello@altairgo.in' },
    { label: 'Terms & Conditions', link: '#' },
    { label: 'Early Access', link: '/' }
  ];

  const renderFooterLink = (it, idx) => {
    if (it.link === '#') {
      return (
        <span key={idx} className={styles.footerLink} style={{ opacity: 0.5, cursor: 'default' }} aria-disabled="true">
          {it.label}
        </span>
      );
    }
    if (it.link.startsWith('mailto')) {
      return <a key={idx} href={it.link} className={styles.footerLink}>{it.label}</a>;
    }
    return <Link key={idx} to={it.link} className={styles.footerLink}>{it.label}</Link>;
  };

  return (
    <>
      {/* 1. Cinematic Connection Image Banner */}
      {showCTABanner && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className={styles.connectionBannerContainer}
        >
          <img 
            src={connectionImg} 
            alt="Connecting Journeys" 
            className={styles.connectionImage}
          />
        </motion.div>
      )}

      <footer className={styles.footer}>
      {/* 2. Bottom Spaced Sand Footer Section */}
      <div className={styles.footerSection}>
        <div className={styles.footerGrid}>
          {/* Left Column: Brand Section */}
          <div className={styles.brandCol}>
            <div className={styles.brandLogo} onClick={() => navigate('/')}>
              <img src={logo} alt="ALTAIRGO" className={styles.footerLogo} />
            </div>
            <p className={styles.brandDesc}>
              India-first AI travel planning built for smarter journeys.
            </p>
            {/* Social Icons row below */}
            <div className={styles.socialRow}>
              <a href="https://instagram.com/altairgo" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://twitter.com/altairgo" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter/X">
                <Twitter size={16} />
              </a>
              <a href="https://linkedin.com/company/altairgo" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://facebook.com/altairgo" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Center Links Columns */}
          <div className={styles.linksCol}>
            <div className={styles.colTitle}>Explore</div>
            <div className={styles.linksList}>
              {exploreLinks.map(renderFooterLink)}
            </div>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.colTitle}>Company</div>
            <div className={styles.linksList}>
              {companyLinks.map(renderFooterLink)}
            </div>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.colTitle}>Resources</div>
            <div className={styles.linksList}>
              {resourcesLinks.map(renderFooterLink)}
            </div>
          </div>

          {/* Right Column: Newsletter Signup Form */}
          <div className={styles.newsletterCol}>
            <div className={styles.newsletterTitle}>Stay Ahead of Every Journey</div>
            <p className={styles.newsletterSubtext}>
              Get destination inspiration, smarter travel ideas, and early access updates from Altairgo.
            </p>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.newsletterSuccess}
              >
                <span className={styles.successHeading}>Welcome aboard!</span>
                <span className={styles.successDesc}>You've successfully joined the waitlist.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className={styles.newsletterForm}>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.mailIcon} />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.newsletterInput}
                    required
                  />
                </div>
                <Button type="submit" variant="primary" style={{ width: '100%' }}>
                  Build My Trip
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits Area */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>© 2026 Altairgo. All Rights Reserved.</div>
          <div style={{ textAlign: 'center', opacity: 0.8, fontSize: '13px' }}>
            Warm. Calm. Editorial. Premium.
          </div>
          <div className={styles.vCredit}>
            <span>Made in 🇮🇳 with चाय</span>
            <span>v3.1 · 2026</span>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
