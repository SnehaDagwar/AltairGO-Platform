import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import logo from '../../assets/logo.png';
import Button from '../ui/Button.jsx';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'AI Planner', to: '/planner' },
  { label: 'Destinations', to: '/discover' },
  { label: 'Blogs', to: '/blogs' }
];

function Logo() {
  return (
    <Link to="/" className={styles.logoArea}>
      <img src={logo} alt="AltairGO" style={{ height: '28px', objectFit: 'contain' }} />
    </Link>
  );
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '4px' }}>
    <path d="M2.5 7h9M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="5" r="2.2" stroke="currentColor" strokeWidth="2" />
    <path d="M2 12c0-2.2 2.2-4 5-4s5 1.8 5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link to="/trips" className={styles.navLink} style={{ fontSize: '14px', fontWeight: 500 }}>
                  My Trips
                </Link>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
                <UserIcon /> Sign In
              </Button>
            )}
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/planner')}
            className={styles.planDesktop}
          >
            Plan Trip <ArrowIcon />
          </Button>

          {/* Hamburger Menu Only for Mobile */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} /* transition-rise Standard Easing */
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`${styles.menuLink} ${isActive(item.to) ? styles.activeMenuLink : ''}`}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Link to="/trips" className={styles.menuLink} onClick={() => setMobileOpen(false)}>
                My Trips
              </Link>
            )}

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {user ? (
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  style={{ width: '100%' }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => { navigate('/login'); setMobileOpen(false); }}
                  style={{ width: '100%' }}
                >
                  <UserIcon /> Sign In
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
