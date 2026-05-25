import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
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
import styles from './Footer.module.css';
import logo from '../../assets/logo.png';

const Footer = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Waitlist form state
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.trim() || !email.includes('@')) {
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

  // Standard directories setup
  const exploreLinks = [
    { label: 'Destinations', link: '/discover' },
    { label: 'AI Planner', link: '/planner' },
    { label: 'Travel Guides', link: '/blogs' },
    { label: 'Experiences', link: '#tour-selection' }
  ];

  const companyLinks = [
    { label: 'About', link: '/about' },
    { label: 'Contact', link: 'mailto:hello@altairgo.in' },
    { label: 'FAQs', link: '#tour-selection' },
    { label: 'Privacy Policy', link: '/privacy' }
  ];

  const resourcesLinks = [
    { label: 'Blog', link: '/blogs' },
    { label: 'Support', link: 'mailto:hello@altairgo.in' },
    { label: 'Terms & Conditions', link: '/terms' },
    { label: 'Early Access', link: '/' }
  ];

  return (
    <footer className={styles.footer}>
      {/* 1. Large Cinematic CTA Banner (Floating Container) */}
      {showCTABanner && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={styles.ctaBanner}
        >
          {/* Parallax Background Visual */}
          <motion.img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop" 
            alt="Cinematic Indian Twilight Coastline"
            className={styles.ctaBgImage}
            animate={{ scale: [1, 1.04] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          {/* Readability scrim layer */}
          <div className={styles.ctaScrim} />

          {/* Centered CTA Content */}
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaHeading}>Discover Smarter Travel with Altairgo</h2>
            <p className={styles.ctaSubtext}>
              Thoughtfully planned Indian journeys, crafted around your travel style
            </p>

            {/* Horizontal Search-Style Feature Pill Bar */}
            <div className={styles.searchPillBar}>
              {/* Feature 1: AI Planning */}
              <div className={styles.pillItem}>
                <div className={styles.pillIconWrapper}>
                  <Sparkles size={16} />
                </div>
                <div className={styles.pillTextCol}>
                  <span className={styles.pillLabel}>AI Planning</span>
                  <span className={styles.pillDesc}>Bespoke paths</span>
                </div>
              </div>

              {/* Feature 2: Seasonal */}
              <div className={styles.pillItem}>
                <div className={styles.pillIconWrapper}>
                  <Compass size={16} />
                </div>
                <div className={styles.pillTextCol}>
                  <span className={styles.pillLabel}>Seasonal Routing</span>
                  <span className={styles.pillDesc}>Optimal weather</span>
                </div>
              </div>

              {/* Feature 3: Multimodal */}
              <div className={styles.pillItem}>
                <div className={styles.pillIconWrapper}>
                  <MapPin size={16} />
                </div>
                <div className={styles.pillTextCol}>
                  <span className={styles.pillLabel}>Train + Roadtrip</span>
                  <span className={styles.pillDesc}>End-to-end aware</span>
                </div>
              </div>

              {/* Feature 4: Personalized */}
              <div className={styles.pillItem}>
                <div className={styles.pillIconWrapper}>
                  <User size={16} />
                </div>
                <div className={styles.pillTextCol}>
                  <span className={styles.pillLabel}>Personalized</span>
                  <span className={styles.pillDesc}>Tailored pacing</span>
                </div>
              </div>

              {/* Pill CTA Button */}
              <button 
                onClick={() => navigate('/planner')} 
                className={styles.pillButton}
              >
                Start Planning <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. Bottom Spaced Off-White Footer Section */}
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
              {exploreLinks.map((it, idx) => (
                <Link key={idx} to={it.link} className={styles.footerLink}>
                  {it.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.colTitle}>Company</div>
            <div className={styles.linksList}>
              {companyLinks.map((it, idx) => (
                it.link.startsWith('mailto') ? (
                  <a key={idx} href={it.link} className={styles.footerLink}>
                    {it.label}
                  </a>
                ) : (
                  <Link key={idx} to={it.link} className={styles.footerLink}>
                    {it.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.colTitle}>Resources</div>
            <div className={styles.linksList}>
              {resourcesLinks.map((it, idx) => (
                <Link key={idx} to={it.link} className={styles.footerLink}>
                  {it.label}
                </Link>
              ))}
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
                <button type="submit" className={styles.newsletterButton}>
                  Build My Trip
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits Area */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>© 2026 Altairgo. All Rights Reserved.</div>
          <div className={styles.vCredit}>
            <span>Made in 🇮🇳 with चाय</span>
            <span>v1.0 · 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
