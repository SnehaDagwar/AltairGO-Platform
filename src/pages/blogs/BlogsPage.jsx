import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from '../../components/blogs/Blogs.module.css';
import { getBlogs } from '../../services/api';
import philHimalayas from '../../assets/phil-himalayas.png';

const BlogsPage = () => {
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogs()
      .then(data => setBlogsData(Array.isArray(data) ? data : (data.blogs || [])))
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
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

  // Helper to assign colors to badges based on category
  const getBadgeClass = (category) => {
    if (!category) return styles.badgeTeal;
    const cat = category.toLowerCase();
    if (cat.includes('drive')) return styles.badgePeach;
    if (cat.includes('beach')) return styles.badgeSky;
    if (cat.includes('culture')) return styles.badgeLavender;
    if (cat.includes('luxury')) return styles.badgeCream;
    return styles.badgeTeal;
  };

  // Separate the blogs into our specialized layout buckets
  // 1. Featured Blog (Hidden Valleys of Meghalaya - id '1')
  const featuredBlog = blogsData.find(b => b.id === '1') || blogsData[0];
  
  // 2. Main Grid Blogs (Lakes, Beaches, Culture, Luxury - ids '2' to '5')
  const mainGridBlogs = [
    blogsData.find(b => b.id === '2') || blogsData[1],
    blogsData.find(b => b.id === '3') || blogsData[2],
    blogsData.find(b => b.id === '4') || blogsData[3],
    blogsData.find(b => b.id === '5') || blogsData[4],
  ].filter(Boolean);

  // 3. Short Reads Blogs (ids '6' to '9')
  const shortReads = [
    blogsData.find(b => b.id === '6') || blogsData[5],
    blogsData.find(b => b.id === '7') || blogsData[6],
    blogsData.find(b => b.id === '8') || blogsData[7],
    blogsData.find(b => b.id === '9') || blogsData[8],
  ].filter(Boolean);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.pageBackground}>
        <img src={philHimalayas} alt="" className={styles.bgIllustration} />
        <div className={styles.bgGradientOverlay} />
      </div>

      <div className={styles.container}>
        
        {/* HERO AREA: Intro text on Left, Featured Card on Right */}
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <span className={styles.heroSub}>TRAVEL STORIES</span>
            <h1 className={styles.heroHeading}>
              Stories that <br />
              <span>inspire journeys</span>
            </h1>
            <span className={styles.heroCursive}>Wander. Discover. Remember.</span>
            <p className={styles.heroDesc}>
              From hidden gems to iconic escapes, explore stories, guides, and tips to fuel your next adventure.
            </p>
            <button 
              className={styles.exploreBtn} 
              onClick={() => {
                document.getElementById('main-stories-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore All Stories <ArrowRight size={16} />
            </button>
          </div>

          <div className={styles.heroRight}>
            {featuredBlog && (
              <div 
                className={styles.featuredCard} 
                onClick={() => navigate(`/blogs/${featuredBlog.id}`)}
              >
                <img src={featuredBlog.image} alt={featuredBlog.title} className={featuredBlog.image ? styles.featuredImg : styles.featuredImgFallback} />
                <div className={styles.featuredOverlay} />
                <div className={styles.featuredContent}>
                  <span className={`${styles.cardCategoryBadge} ${styles.badgeTealFeatured}`}>FEATURED STORY</span>
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
            )}
          </div>
        </div>

        {/* MAIN STORIES GRID */}
        {mainGridBlogs.length > 0 && (
          <div id="main-stories-grid" className={styles.mainGrid}>
            {mainGridBlogs.map((blog, index) => {
              // Custom CSS class names for different card shapes
              let cardClass = styles.gridCard;
              if (index === 0) cardClass = `${styles.gridCard} ${styles.tallCard}`;
              else if (index === 1) cardClass = `${styles.gridCard} ${styles.wideCard}`;
              else if (index === 2) cardClass = `${styles.gridCard} ${styles.squareCardLeft}`;
              else if (index === 3) cardClass = `${styles.gridCard} ${styles.squareCardRight}`;

              return (
                <article 
                  key={blog.id} 
                  className={cardClass} 
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                >
                  <div className={styles.cardImgWrapper}>
                    <img src={blog.image} alt={blog.title} className={styles.cardImg} />
                    <div className={styles.cardGradientOverlay} />
                    <span className={`${styles.cardCategoryBadge} ${getBadgeClass(blog.category)}`}>
                      {blog.category}
                    </span>
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
                </article>
              );
            })}
          </div>
        )}

        {/* SHORT READS SECTION */}
        {shortReads.length > 0 && (
          <div className={styles.shortReadsSection}>
            <div className={styles.shortReadsHeader}>
              <span className={styles.shortReadsSub}>SHORT READS</span>
              <h2 className={styles.shortReadsTitle}>Quick reads for your wanderlust</h2>
              <div className={styles.wavyLine}>
                <svg viewBox="0 0 150 10" width="150" height="10" fill="none">
                  <path d="M 10,5 C 25,2 40,8 55,5 C 70,2 85,8 100,5 C 115,2 130,8 145,5" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className={styles.shortReadsGrid}>
              {shortReads.map((blog) => (
                <div 
                  key={blog.id} 
                  className={styles.shortReadItem}
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                >
                  <img src={blog.image} alt={blog.title} className={styles.shortReadThumb} />
                  <div className={styles.shortReadInfo}>
                    <h3 className={styles.shortReadTitle}>{blog.title}</h3>
                    <div className={styles.shortReadMeta}>
                      <span>{blog.readTime}</span>
                      <ArrowRight size={12} className={styles.shortReadArrow} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWSLETTER BANNER */}
        <div className={styles.newsletterBanner}>
          <div className={styles.newsletterLeft}>
            <div className={styles.mailIconCircle}>
              <Mail size={24} className={styles.mailIcon} />
            </div>
            <div className={styles.newsletterText}>
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
              {submitting ? 'Subscribing...' : 'Subscribe Now'} <ArrowRight size={16} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default BlogsPage;
