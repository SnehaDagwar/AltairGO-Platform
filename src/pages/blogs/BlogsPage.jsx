import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnvelopeSimple, ArrowRight, ArrowClockwise } from '@phosphor-icons/react';
import toast from 'react-hot-toast';
import styles from '../../components/blogs/Blogs.module.css';
import { getBlogs } from '../../services/api';
import { RevealWords, FadeUp, Stagger, staggerItem } from '../../components/common/TextReveal.jsx';

const BlogsPage = () => {
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [visibleShortReadsCount, setVisibleShortReadsCount] = useState(4);

  const fetchBlogs = useCallback(() => {
    return getBlogs()
      .then(data => {
        setBlogsData(Array.isArray(data) ? data : (data.blogs || []));
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.error('Failed to fetch blogs:', err);
        setFetchFailed(true);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleRetry = () => {
    setLoading(true);
    setFetchFailed(false);
    fetchBlogs();
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!trimmed || !emailValid) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Successfully subscribed to travel stories!');
      setEmail('');
      setSubmitting(false);
    }, 800);
  };

  // Separate the blogs into our specialized layout buckets dynamically
  // 1. Featured Blog is the first blog (index 0)
  const featuredBlog = blogsData[0];
  
  // 2. Main Grid Blogs are the next 4 blogs (indices 1 to 4)
  const mainGridBlogs = blogsData.slice(1, 5);

  // 3. Short Reads Blogs are sliced dynamically
  const shortReads = blogsData.slice(5, 5 + visibleShortReadsCount);
  const hasMore = blogsData.length > 5 + visibleShortReadsCount;

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          {/* HERO AREA SKELETON */}
          <div className={styles.heroGrid} style={{ pointerEvents: 'none' }}>
            <div className={styles.heroLeft}>
              <div className={styles.skeleton} style={{ width: '120px', height: '18px', marginBottom: '0.75rem', borderRadius: '4px' }} />
              <div className={styles.skeleton} style={{ width: '280px', height: '48px', marginBottom: '0.5rem' }} />
              <div className={styles.skeleton} style={{ width: '200px', height: '48px', marginBottom: '1.5rem' }} />
              <div className={styles.skeleton} style={{ width: '100%', height: '16px', marginBottom: '0.5rem' }} />
              <div className={styles.skeleton} style={{ width: '80%', height: '16px', marginBottom: '2.5rem' }} />
              <div className={styles.skeleton} style={{ width: '180px', height: '44px', borderRadius: '999px' }} />
            </div>

            <div className={styles.heroRight}>
              <div className={styles.skeletonCard} style={{ height: '430px' }}>
                <div className={styles.skeleton} style={{ width: '130px', height: '24px', borderRadius: '999px', alignSelf: 'flex-start' }} />
                <div className={styles.skeleton} style={{ width: '90%', height: '32px', marginTop: 'auto' }} />
                <div className={styles.skeleton} style={{ width: '70%', height: '16px' }} />
                <div className={styles.skeleton} style={{ width: '50%', height: '14px' }} />
              </div>
            </div>
          </div>

          {/* MAIN STORIES GRID SKELETON */}
          <div className={styles.mainGrid}>
            <div className={`${styles.skeletonCard} ${styles.tallCard}`} style={{ minHeight: '430px' }}>
              <div className={styles.skeleton} style={{ width: '90px', height: '20px', borderRadius: '999px', alignSelf: 'flex-start' }} />
              <div className={styles.skeleton} style={{ width: '85%', height: '24px', marginTop: 'auto' }} />
              <div className={styles.skeleton} style={{ width: '50%', height: '14px' }} />
            </div>
            <div className={`${styles.skeletonCard} ${styles.wideCard}`} style={{ height: '200px' }}>
              <div className={styles.skeleton} style={{ width: '90px', height: '20px', borderRadius: '999px', alignSelf: 'flex-start' }} />
              <div className={styles.skeleton} style={{ width: '85%', height: '24px', marginTop: 'auto' }} />
              <div className={styles.skeleton} style={{ width: '50%', height: '14px' }} />
            </div>
            <div className={`${styles.skeletonCard} ${styles.squareCardLeft}`} style={{ height: '200px' }}>
              <div className={styles.skeleton} style={{ width: '90px', height: '20px', borderRadius: '999px', alignSelf: 'flex-start' }} />
              <div className={styles.skeleton} style={{ width: '85%', height: '24px', marginTop: 'auto' }} />
              <div className={styles.skeleton} style={{ width: '50%', height: '14px' }} />
            </div>
            <div className={`${styles.skeletonCard} ${styles.squareCardRight}`} style={{ height: '200px' }}>
              <div className={styles.skeleton} style={{ width: '90px', height: '20px', borderRadius: '999px', alignSelf: 'flex-start' }} />
              <div className={styles.skeleton} style={{ width: '85%', height: '24px', marginTop: 'auto' }} />
              <div className={styles.skeleton} style={{ width: '50%', height: '14px' }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (fetchFailed) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
            <span className={styles.heroSub}>TRAVEL STORIES</span>
            <h1 className={styles.heroHeading} style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              Stories are taking a detour
            </h1>
            <p style={{ color: '#5e5d59', maxWidth: '420px', lineHeight: 1.6 }}>
              We couldn't load the latest travel stories right now. Please check your connection and try again.
            </p>
            <button
              className={styles.exploreBtn}
              onClick={handleRetry}
            >
              Try Again <ArrowClockwise size={16} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* HERO AREA: Intro text on Left, Featured Card on Right */}
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <FadeUp as="span" className={styles.heroSub} delay={0}>TRAVEL STORIES</FadeUp>
            <RevealWords text="Stories that inspire journeys" as="h1" className={styles.heroHeading} stagger={0.07} />
            <FadeUp delay={0.18} as="span" className={styles.heroCursive}>Wander. Discover. Remember.</FadeUp>
            <FadeUp delay={0.25} as="p" className={styles.heroDesc}>
              From hidden gems to iconic escapes, explore stories, guides, and tips to fuel your next adventure.
            </FadeUp>
            <button 
              className={styles.exploreBtn} 
              onClick={() => {
                const element = document.getElementById('main-stories-grid') || document.getElementById('short-reads-section');
                if (element) {
                  const offset = 90; // height of fixed navbar + padding
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + (window.scrollY || window.pageYOffset) - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Explore All Stories <ArrowRight size={16} />
            </button>
          </div>

          <div className={styles.heroRight}>
            {featuredBlog ? (
              <div 
                className={styles.featuredCard} 
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/blogs/${featuredBlog.id}`)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/blogs/${featuredBlog.id}`); }}}
                aria-label={`Read ${featuredBlog.title}`}
              >
                <img src={featuredBlog.image} alt={featuredBlog.title} className={featuredBlog.image ? styles.featuredImg : styles.featuredImgFallback} />
                <div className={styles.featuredOverlay} />
                <div className={styles.featuredContent}>
                  <h2 className={styles.featuredTitle}>{featuredBlog.title}</h2>
                  <p className={styles.featuredExcerpt}>{featuredBlog.excerpt}</p>
                  <div className={styles.featuredMeta}>
                    <span>{featuredBlog.date}</span>
                    <span>•</span>
                    <span>{featuredBlog.readTime}</span>
                    <span>•</span>
                    <span>{featuredBlog.category}</span>
                  </div>
                </div>
              </div>
            ) : !loading && !fetchFailed ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#5e5d59' }}>
                <p>No stories yet. Check back soon!</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* MAIN STORIES GRID */}
        {mainGridBlogs.length > 0 && (
          <Stagger id="main-stories-grid" className={styles.mainGrid} stagger={0.07}>
            {mainGridBlogs.map((blog, index) => {
              // Custom CSS class names for different card shapes
              let cardClass = styles.gridCard;
              if (index === 0) cardClass = `${styles.gridCard} ${styles.tallCard}`;
              else if (index === 1) cardClass = `${styles.gridCard} ${styles.wideCard}`;
              else if (index === 2) cardClass = `${styles.gridCard} ${styles.squareCardLeft}`;
              else if (index === 3) cardClass = `${styles.gridCard} ${styles.squareCardRight}`;

              return (
                <motion.article 
                  key={blog.id} 
                  variants={staggerItem}
                  className={cardClass} 
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/blogs/${blog.id}`); }}}
                  aria-label={`Read ${blog.title}`}
                >
                  <div className={styles.cardImgWrapper}>
                    <img src={blog.image} alt={blog.title} className={styles.cardImg} />
                    <div className={styles.cardGradientOverlay} />
                  </div>
                  <div className={styles.cardDetails}>
                    <h3 className={styles.cardTitle}>{blog.title}</h3>
                    <div className={styles.cardMeta}>
                      {index > 0 && (
                        <>
                          <span>{blog.date}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>{blog.readTime}</span>
                      <ArrowRight size={14} className={styles.arrowIcon} />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </Stagger>
        )}

        {/* SHORT READS SECTION */}
        {shortReads.length > 0 && (
          <div id="short-reads-section" className={styles.shortReadsSection}>
            <div className={styles.shortReadsHeader}>
              <FadeUp as="span" className={styles.shortReadsSub}>SHORT READS</FadeUp>
              <RevealWords text="Quick reads for your wanderlust" as="h2" className={styles.shortReadsTitle} stagger={0.06} />
              <div className={styles.wavyLine}>
                <svg viewBox="0 0 150 10" width="150" height="10" fill="none">
                  <path d="M 10,5 C 25,2 40,8 55,5 C 70,2 85,8 100,5 C 115,2 130,8 145,5" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <Stagger className={styles.shortReadsGrid} stagger={0.06}>
              {shortReads.map((blog) => (
                <motion.div 
                  key={blog.id} 
                  variants={staggerItem}
                  className={styles.shortReadItem}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/blogs/${blog.id}`); }}}
                  aria-label={`Read ${blog.title}`}
                >
                  <img src={blog.image} alt={blog.title} className={styles.shortReadThumb} />
                  <div className={styles.shortReadInfo}>
                    <h3 className={styles.shortReadTitle}>{blog.title}</h3>
                    <div className={styles.shortReadMeta}>
                      <span>{blog.readTime}</span>
                      <ArrowRight size={12} className={styles.shortReadArrow} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </Stagger>
            {hasMore && (
              <div className={styles.loadMoreWrapper}>
                <button 
                  className={styles.loadMoreBtn} 
                  onClick={() => setVisibleShortReadsCount(prev => prev + 4)}
                >
                  Load More Stories
                </button>
              </div>
            )}
          </div>
        )}

        {/* NEWSLETTER BANNER */}
        <motion.div 
          className={styles.newsletterBanner}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className={styles.newsletterLeft}>
            <div className={styles.mailIconCircle}>
              <EnvelopeSimple size={24} weight="bold" className={styles.mailIcon} />
            </div>
            <div className={styles.newsletterText}>
              <span className={styles.newsletterLabel}>NEWSLETTER</span>
              <h2 className={styles.newsletterTitle}>Get travel stories straight to your inbox</h2>
              <p className={styles.newsletterSub}>
                Curated stories, exclusive guides, and travel inspiration — delivered weekly.
              </p>
            </div>
          </div>
          <form className={styles.subscribeFormWrapper} onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className={styles.emailInputUnified}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              required
            />
            <button type="submit" className={styles.subscribeBtnUnified} disabled={submitting}>
              {submitting ? 'Subscribing...' : 'Subscribe Now'} <ArrowRight size={16} weight="bold" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default BlogsPage;
