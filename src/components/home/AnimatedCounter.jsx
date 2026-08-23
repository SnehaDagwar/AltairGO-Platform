import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter
 * Smoothly interpolates numeric values when scrolled into view.
 * If value is non-numeric (e.g. "AI", "Smart", "Live"), renders directly with zero hooks/rAF overhead.
 */
export default function AnimatedCounter({ value, duration = 1.2 }) {
  const valueStr = String(value);
  const match = valueStr.match(/^([$€₹]?)([0-9.]+)([a-zA-Z%+]*)$/);

  // Fast path: render non-numeric strings directly
  if (!match) {
    return <span>{value}</span>;
  }

  return <NumericCounter prefix={match[1]} targetNum={parseFloat(match[2])} suffix={match[3]} rawValue={value} duration={duration} />;
}

function NumericCounter({ prefix, targetNum, suffix, rawValue, duration }) {
  const [displayCount, setDisplayCount] = useState(() => `${prefix}0${suffix}`);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isNaN(targetNum)) return;

    let animationFrameId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          const startTime = performance.now();
          const durationMs = duration * 1000;
          const isDecimal = String(targetNum).includes('.');

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            
            // Standard cubic ease-out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOut * targetNum;
            
            const formatted = isDecimal
              ? currentVal.toFixed(1) 
              : Math.round(currentVal).toString();

            setDisplayCount(`${prefix}${formatted}${suffix}`);

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setDisplayCount(rawValue);
            }
          };

          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [prefix, targetNum, suffix, rawValue, duration]);

  return <span ref={containerRef}>{displayCount}</span>;
}
