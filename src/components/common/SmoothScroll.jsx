import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.4,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Expose for debugging / external control
    window.__lenis = lenis;

    // Sync scroll restoration on route change is handled separately;
    // Lenis autoRaf keeps RAF loop alive without manual raf().

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  // Scroll to top on route change — use Lenis if available for smooth transition,
  // otherwise instant. Skip for hash navigations (anchor links).
  useEffect(() => {
    if (window.location.hash) return;
    const lenis = lenisRef.current;
    if (lenis) {
      // instant: false => animate; immediate would be instant
      lenis.scrollTo(0, { immediate: false, duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname]);

  return null;
}
