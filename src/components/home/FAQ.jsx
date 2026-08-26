import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS, COLLAGE_IMAGES, Icons } from '../../constants/homeData.jsx';
import styles from '../../pages/Home.module.css';
import { RevealWords, FadeUp, Stagger, staggerItem } from '../common/TextReveal.jsx';

/**
 * FAQ Accordion Section
 * Fully accessible WAI-ARIA Accordion pattern with smooth expand/collapse.
 */
export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.faqSection} aria-labelledby="faq-main-heading">
      <div className={styles.sectionContainer}>
        <div className={styles.faqGrid}>
          
          {/* Left Side: Floating Image Collage */}
          <div className={styles.faqCollageCol} aria-hidden="true">
            <div className={styles.faqCollageBox}>
              <img 
                src={COLLAGE_IMAGES.kashmir} 
                alt=""
                className={styles.faqImg1}
                loading="lazy"
                decoding="async"
              />
              <img 
                src={COLLAGE_IMAGES.rajasthan} 
                alt=""
                className={styles.faqImg2}
                loading="lazy"
                decoding="async"
              />
              <img 
                src={COLLAGE_IMAGES.kerala} 
                alt=""
                className={styles.faqImg3}
                loading="lazy"
                decoding="async"
              />
              <img 
                src={COLLAGE_IMAGES.goa} 
                alt=""
                className={styles.faqImg4}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right Side: Accordion Questions */}
          <div className={styles.faqAccordionCol}>
            <div className={styles.faqHeader}>
              <RevealWords text="Still Have Questions? We've Got Answers" as="h2" id="faq-main-heading" className={styles.faqHeading} stagger={0.06} />
              <FadeUp delay={0.15} className={styles.faqSubheading} as="p">
                Everything you need to know about AltairGO's AI travel engine, pricing, and live route optimization.
              </FadeUp>
            </div>

            <Stagger className={styles.faqList} role="region" aria-label="Frequently asked questions list" stagger={0.06} delay={0.1}>
              {FAQS.map((faq, i) => {
                const isActive = activeFaq === i;
                const panelId = `faq-panel-${faq.id}`;
                const triggerId = `faq-trigger-${faq.id}`;

                return (
                  <motion.div
                    key={faq.id}
                    variants={staggerItem}
                    className={`${styles.faqItem} ${isActive ? styles.faqItemActive : ''}`}
                  >
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => toggleFaq(i)}
                      className={styles.faqTriggerBtn}
                    >
                      <span className={styles.faqQuestionText}>
                        <span className={styles.faqNumber}>0{i + 1}.</span> 
                        {faq.q}
                      </span>
                      
                      <div className={`${styles.faqChevronWrap} ${isActive ? styles.faqChevronActive : ''}`}>
                        <Icons.Chev className={styles.faqChevronIcon} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={triggerId}
                          aria-hidden={!isActive}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className={styles.faqAnswerContainer}
                        >
                          <p className={styles.faqAnswerText}>
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </Stagger>

          </div>
        </div>
      </div>
    </section>
  );
}
