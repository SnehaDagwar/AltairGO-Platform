/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { motion } from 'framer-motion';

const defaultEase = [0.22, 1, 0.36, 1];

// Splits text into words and staggers them on scroll/enter
export function RevealWords({
  text,
  as: Component = 'div',
  className,
  style,
  stagger = 0.07,
  delay = 0,
  duration = 0.72,
  y = '110%',
  once = true,
  amount = 0.2,
  id,
}) {
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    const Tag = Component;
    return <Tag id={id} className={className} style={style}>{text}</Tag>;
  }

  const words = String(text).split(/(\s+)/); // keep spaces as tokens

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const item = {
    hidden: { y, opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration, ease: defaultEase },
    },
  };

  const MotionTag = motion[Component] || motion.div;

  return (
    <MotionTag
      id={id}
      className={className}
      style={{ ...style, overflow: 'hidden' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={container}
      aria-label={text}
    >
      {words.map((w, i) => {
        if (w.trim() === '') {
          return <span key={`sp-${i}`} style={{ display: 'inline', whiteSpace: 'pre' }} aria-hidden="true">{w}</span>;
        }
        return (
          <span
            key={`${w}-${i}`}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.04em' }}
            aria-hidden="true"
          >
            <motion.span
              variants={item}
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
              aria-hidden="true"
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}

// Character level reveal for big display words (more dramatic)
export function RevealChars({
  text,
  as: Component = 'div',
  className,
  style,
  stagger = 0.035,
  delay = 0,
  duration = 0.65,
  once = true,
  id,
}) {
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    const Tag = Component;
    return <Tag id={id} className={className} style={style}>{text}</Tag>;
  }
  const chars = Array.from(String(text));
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item = {
    hidden: { y: '115%', opacity: 0, rotate: 0.001 },
    visible: { y: '0%', opacity: 1, rotate: 0.001, transition: { duration, ease: defaultEase } },
  };
  const MotionTag = motion[Component] || motion.div;
  return (
    <MotionTag
      id={id}
      className={className}
      style={{ ...style, overflow: 'hidden' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={container}
      aria-label={text}
    >
      {chars.map((ch, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }} aria-hidden="true">
          <motion.span variants={item} style={{ display: 'inline-block', willChange: 'transform' }} aria-hidden="true">
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

// Generic fade-up for paragraphs / blocks
export function FadeUp({
  children,
  as: Component = 'div',
  className,
  style,
  delay = 0,
  duration = 0.7,
  y = 18,
  once = true,
  amount = 0.2,
}) {
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    const Tag = Component;
    return <Tag className={className} style={style}>{children}</Tag>;
  }
  const MotionTag = motion[Component] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: defaultEase }}
    >
      {children}
    </MotionTag>
  );
}

// Stagger container for lists/cards
export function Stagger({ children, className, style, stagger = 0.08, delay = 0, once = true }) {
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return <div className={className} style={style}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: defaultEase } },
};
