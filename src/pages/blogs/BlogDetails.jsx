import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, CalendarBlank, Clock, User, Tag } from '@phosphor-icons/react';
import DOMPurify from 'dompurify';
import { getBlog } from '../../services/api';
import styles from './BlogDetails.module.css';

const panelVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, transform: 'translateY(25px)' },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
  }
};

const SkeletonLoader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            <div className={styles.skeleton} style={{ width: '110px', height: '36px', borderRadius: '999px' }} />
            <div className={styles.skeleton} style={{ width: '70px', height: '18px', marginTop: '2rem' }} />
            <div className={styles.skeleton} style={{ width: '90%', height: '40px' }} />
            <div className={styles.skeleton} style={{ width: '75%', height: '40px' }} />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <div className={styles.skeleton} style={{ width: '90px', height: '14px' }} />
              <div className={styles.skeleton} style={{ width: '70px', height: '14px' }} />
            </div>
          </div>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.skeleton} style={{ width: '100%', aspectRatio: '16 / 10', borderRadius: '24px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '2rem' }}>
            <div className={styles.skeleton} style={{ width: '100%', height: '16px' }} />
            <div className={styles.skeleton} style={{ width: '96%', height: '16px' }} />
            <div className={styles.skeleton} style={{ width: '98%', height: '16px' }} />
            <div className={styles.skeleton} style={{ width: '45%', height: '16px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setFetchError(false);
    setLoading(true);
    getBlog(id)
      .then(data => {
        setBlog(data);
      })
      .catch((err) => {
        console.error("Error fetching blog details:", err);
        setFetchError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <SkeletonLoader />;

  if (!blog || fetchError) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Story Not Found</h2>
          <p className={styles.errorText}>
            The travel story you are looking for has taken a detour or does not exist.
          </p>
          <Link to="/blogs" className={styles.errorBtn}>
            <ArrowLeft size={16} weight="bold" />
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* Sticky Left Info Panel */}
        <motion.div 
          className={styles.leftPanel}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Link to="/blogs" className={styles.backBtn}>
              <ArrowLeft size={16} weight="bold" />
              All Stories
            </Link>
          </motion.div>

          <div className={styles.metaHeader}>
            <motion.span className={styles.category} variants={itemVariants}>
              {blog.category || 'Travel Story'}
            </motion.span>
            <motion.h1 className={styles.title} variants={itemVariants}>
              {blog.title}
            </motion.h1>
            
            <motion.div className={styles.metaList} variants={itemVariants}>
              {blog.author && (
                <span className={styles.metaItem}>
                  <User size={16} weight="bold" />
                  {blog.author}
                </span>
              )}
              {blog.date && (
                <span className={styles.metaItem}>
                  <CalendarBlank size={16} weight="bold" />
                  {blog.date}
                </span>
              )}
              {blog.readTime && (
                <span className={styles.metaItem}>
                  <Clock size={16} weight="bold" />
                  {blog.readTime}
                </span>
              )}
            </motion.div>
          </div>

          <motion.div className={styles.progressWrapper} variants={itemVariants}>
            <span className={styles.progressLabel}>Reading Progress</span>
            <div className={styles.progressBarTrack}>
              <motion.div 
                className={styles.progressBarFill} 
                style={{ scaleX }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Scrollable Right Content Panel */}
        <div className={styles.rightPanel}>
          <motion.div 
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, transform: 'translateY(30px) scale(1.02)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {blog.image ? (
              <img
                src={blog.image}
                alt={blog.title}
                className={styles.heroImage}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div style={{ height: '100%', background: 'linear-gradient(135deg, #141413 0%, #30302e 100%)' }} />
            )}
            <div className={styles.heroOverlay} />
          </motion.div>

          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, transform: 'translateY(25px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            {blog.excerpt && (
              <p className={styles.lead}>{blog.excerpt}</p>
            )}

            {/* Main content parsing */}
            {(() => {
              if (!blog.content) return null;
              let parsedContent = blog.content;
              if (typeof blog.content === 'string') {
                const trimmed = blog.content.trim();
                if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
                  try {
                    parsedContent = JSON.parse(trimmed);
                  } catch (e) {
                    // Fail gracefully
                  }
                }
              }

              if (typeof parsedContent === 'string') {
                return (
                  <div
                    className={styles.prose}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parsedContent) }}
                  />
                );
              }

              if (Array.isArray(parsedContent)) {
                return (
                  <div className={styles.prose}>
                    {parsedContent.map((section, i) => (
                      <div key={i} className={styles.sectionBlock}>
                        {section.heading && <h2 className={styles.sectionHeading}>{section.heading}</h2>}
                        {section.text && <p className={styles.sectionText}>{section.text}</p>}
                        {section.image && (
                          <div className={styles.sectionImageWrapper}>
                            <img
                              src={section.image}
                              alt={section.heading || ''}
                              className={styles.sectionImage}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }

              return null;
            })()}

            {blog.tags && blog.tags.length > 0 && (
              <div className={styles.tagsContainer}>
                <Tag size={16} weight="bold" className={styles.tagIcon} />
                {blog.tags.map((tag, i) => (
                  <span key={i} className={styles.tagBadge}>{tag}</span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetails;
