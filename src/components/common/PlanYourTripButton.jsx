import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import styles from './PlanYourTripButton.module.css';

export default function PlanYourTripButton({ onClick }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values to track the mouse coordinates relative to the button center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Premium spring physics config for a weighted, organic movement
  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax layers for 3D depth separation
  // 1. Glow aura: tracks mouse closely (95% pull)
  const glowX = useTransform(springX, (x) => x * 0.95);
  const glowY = useTransform(springY, (y) => y * 0.95);

  // 2. Main button container: moves moderate distance (60% pull)
  const buttonX = useTransform(springX, (x) => x * 0.6);
  const buttonY = useTransform(springY, (y) => y * 0.6);

  // 3. Foreground text and icon: moves minimal distance (30% pull)
  const contentX = useTransform(springX, (x) => x * 0.3);
  const contentY = useTransform(springY, (y) => y * 0.3);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of the button container
    const xVal = e.clientX - (rect.left + rect.width / 2);
    const yVal = e.clientY - (rect.top + rect.height / 2);

    // Dynamic activation zone around the button
    const distance = Math.sqrt(xVal * xVal + yVal * yVal);
    const activeRadius = 140;

    if (distance < activeRadius) {
      // Pull force decays as mouse moves away from the center
      const factor = (activeRadius - distance) / activeRadius;
      const pullX = (xVal / (rect.width / 2)) * 16 * factor;
      const pullY = (yVal / (rect.height / 2)) * 16 * factor;

      mouseX.set(pullX);
      mouseY.set(pullY);
      
      if (!isHovered) {
        setIsHovered(true);
      }
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Sparkles or particles that float on hover
  const sparkles = [
    { id: 1, top: '20%', left: '15%', size: 4, delay: 0.1 },
    { id: 2, top: '75%', left: '35%', size: 3, delay: 0.3 },
    { id: 3, top: '30%', left: '80%', size: 4, delay: 0.2 },
    { id: 4, top: '65%', left: '85%', size: 3, delay: 0.4 },
  ];

  return (
    <div
      ref={containerRef}
      className={styles.buttonContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer Glow Aura - tracks mouse coordinates */}
      <motion.div
        className={styles.glowAura}
        style={{
          x: glowX,
          y: glowY,
          scale: isHovered ? 1.15 : 0.9,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Main Glassmorphic Button Container */}
      <motion.button
        type="button"
        id="hero-plan-btn"
        className={styles.buttonBase}
        onClick={onClick}
        style={{
          x: buttonX,
          y: buttonY,
        }}
        whileTap={{ scale: 0.96, translateY: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {/* Continuous shimmering reflection line */}
        <motion.div
          className={styles.shimmer}
          animate={isHovered ? {
            left: ["-100%", "200%"],
          } : { left: "-100%" }}
          transition={isHovered ? {
            repeat: Infinity,
            repeatDelay: 1.5,
            duration: 1.4,
            ease: "easeInOut",
          } : { duration: 0.3 }}
        />

        {/* Floating background spark dots when hovered */}
        <AnimatePresence>
          {isHovered && sparkles.map((spark) => (
            <motion.span
              key={spark.id}
              style={{
                position: 'absolute',
                top: spark.top,
                left: spark.left,
                width: spark.size,
                height: spark.size,
                borderRadius: '50%',
                backgroundColor: 'var(--color-teal)',
                opacity: 0.6,
                pointerEvents: 'none',
              }}
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{
                scale: [0, 1.2, 0.8, 0],
                opacity: [0, 0.8, 0.6, 0],
                y: [-2, -12],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: Math.random() * 0.5,
                delay: spark.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </AnimatePresence>

        {/* Foreground Content Wrapper */}
        <motion.div
          className={styles.contentWrapper}
          style={{
            x: contentX,
            y: contentY,
          }}
        >
          <span className={styles.textLabel}>
            Plan Your Trip
            <motion.span 
              className={styles.sparkleDot}
              animate={isHovered ? { opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] } : { opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
            />
          </span>

          {/* Animated SVG Arrow */}
          <span className={styles.iconContainer}>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrowSvg}
            >
              {/* Main Arrow Line - extends/shrinks dynamically */}
              <motion.path 
                d="M1.5 7H12.5" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                animate={isHovered ? { pathLength: [0.7, 1] } : { pathLength: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
              {/* Arrow Head */}
              <path 
                d="M7.5 2L12.5 7L7.5 12" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.div>
      </motion.button>
    </div>
  );
}
