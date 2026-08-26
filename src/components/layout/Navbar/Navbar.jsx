import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext.jsx';
import logo from '../../../assets/logo.png';
import Button from '../../common/Button.jsx';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'AI Planner', to: '/planner' },
  { label: 'Destinations', to: '/discover' },
  { label: 'Blogs', to: '/blogs' }
];

const Logo = memo(function Logo() {
  return (
    <Link to="/" className={styles.logoArea} aria-label="AltairGO home">
      <img
        src={logo}
        alt="AltairGO"
        width="120"
        height="28"
        decoding="async"
        fetchPriority="high"
        style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
      />
    </Link>
  );
});


const UserIcon = memo(() => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="5" r="2.2" stroke="currentColor" strokeWidth="2" />
    <path d="M2 12c0-2.2 2.2-4 5-4s5 1.8 5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
));

const HamburgerIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" />
  </svg>
));

const CloseIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" />
  </svg>
));

// Extracted style constants to avoid re-creating objects on every render
const SIGNED_IN_CONTAINER_STYLE = { display: 'flex', alignItems: 'center', gap: '16px' };
const MY_TRIPS_LINK_STYLE = { fontSize: '14px', fontWeight: 500 };
const MOBILE_ACTIONS_STYLE = { marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' };
const FULL_WIDTH_STYLE = { width: '100%' };

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Initialize from current scroll to avoid flash on reload at mid-page
  const [isScrolled, setIsScrolled] = useState(() => typeof window !== 'undefined' ? window.scrollY > 40 : false);
  const tickingRef = useRef(false);
  const lastScrolledRef = useRef(isScrolled);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', handleEscape);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    // Sync ref with state
    lastScrolledRef.current = isScrolled;
  }, [isScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 40;
        // Avoid setState if value hasn't changed
        if (shouldBeScrolled !== lastScrolledRef.current) {
          lastScrolledRef.current = shouldBeScrolled;
          setIsScrolled(shouldBeScrolled);
        }
        tickingRef.current = false;
      });
    };
    // Use passive to avoid blocking scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check once on mount (already initialized but handle back-forward cache)
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = useCallback((to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to),
  [location.pathname]);

  const handleLogout = useCallback(() => {
    logout();
    setMobileOpen(false);
    navigate('/');
  }, [logout, navigate]);

  const handleToggleMenu = useCallback(() => setMobileOpen((o) => !o), []);
  const handleCloseMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <header className={`${styles.navbarWrapper} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Logo area */}
        <Logo />

        {/* Desktop links */}
        <nav className={styles.desktopLinks}>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`${styles.navLink} ${isActive(item.to) ? styles.activeNavLink : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA group */}
        <div className={styles.ctaGroup}>
          <div className={styles.signInDesktop}>
            {user ? (
              <div style={SIGNED_IN_CONTAINER_STYLE}>
                <Link to="/trips" className={styles.navLink} style={MY_TRIPS_LINK_STYLE}>
                  My Trips
                </Link>
                <Button variant="glass" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="glass" size="sm" onClick={() => navigate('/login')}>
                <UserIcon /> Sign In
              </Button>
            )}
          </div>



          {/* Hamburger Menu Only for Mobile */}
          <button
            className={styles.hamburger}
            onClick={handleToggleMenu}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop to capture outside clicks and dim content */}
            <motion.button
              aria-label="Close menu"
              onClick={handleCloseMenu}
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
            <motion.div
              id="mobile-nav"
              className={styles.mobileMenu}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={handleCloseMenu}
                  className={`${styles.menuLink} ${isActive(item.to) ? styles.activeMenuLink : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              {user && (
                <Link to="/trips" className={styles.menuLink} onClick={handleCloseMenu}>
                  My Trips
                </Link>
              )}

              <div style={MOBILE_ACTIONS_STYLE}>
                {user ? (
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    style={FULL_WIDTH_STYLE}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => { navigate('/login'); handleCloseMenu(); }}
                    style={FULL_WIDTH_STYLE}
                  >
                    <UserIcon /> Sign In
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
