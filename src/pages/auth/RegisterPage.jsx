import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import { EnvelopeSimple, LockSimple, User, ArrowRight, GlobeSimple, ShieldCheck, Sparkle, WarningCircle } from '@phosphor-icons/react';
import styles from './Auth.module.css';
import logo from '../../assets/logo.png';

const getPasswordStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: 'Weak', color: '#ef4444', pct: '20%' };
  if (score <= 2) return { score, label: 'Fair', color: '#0BA060', pct: '45%' };
  if (score <= 3) return { score, label: 'Good', color: '#3b82f6', pct: '70%' };
  return { score, label: 'Strong', color: '#10b981', pct: '100%' };
};

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 12) { setError('Password must be at least 12 characters'); return; }
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/trips');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.heroPanel}>
        <div className={styles.heroOverlay}>
          <Link to="/" className={styles.heroBrand}>
            <img src={logo} alt="AltairGO Logo" className={styles.heroLogo} />
          </Link>
          <h2 className={styles.heroTitle}>
            Join thousands of<br />smart travelers.
          </h2>
          <p className={styles.heroSubtitle}>
            Create your free account and start generating AI-powered travel itineraries in minutes.
            No credit card required.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>Free</strong>
              <span>Forever</span>
            </div>
            <div className={styles.heroStat}>
              <strong>Instant</strong>
              <span>Setup</span>
            </div>
            <div className={styles.heroStat}>
              <strong>AI</strong>
              <span>Powered</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.formPanel}>
        <motion.div 
          className={styles.formCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.formHeader}>
            <div className={styles.formIcon}><Sparkle size={24} weight="bold" /></div>
            <h1 className={styles.formTitle}>Create account</h1>
            <p className={styles.formSubtitle}>Start planning your dream trips today</p>
          </div>

          {error && (
            <motion.div 
              className={styles.error}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <WarningCircle size={16} weight="bold" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="reg-name" className={styles.fieldLabel}>Full name</label>
              <div className={styles.inputGroup}>
                <User size={18} className={styles.inputIcon} />
                <input
                  id="reg-name"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="reg-email" className={styles.fieldLabel}>Email address</label>
              <div className={styles.inputGroup}>
                <EnvelopeSimple size={18} className={styles.inputIcon} />
                <input
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="reg-password" className={styles.fieldLabel}>Password</label>
              <div className={styles.inputGroup}>
                <LockSimple size={18} className={styles.inputIcon} />
                <input
                  id="reg-password"
                  type="password"
                  placeholder="Min. 12 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                  autoComplete="new-password"
                />
                {password && (
                  <div className={styles.strengthBar}>
                    <div className={styles.strengthFill} style={{ transform: `scaleX(${parseFloat(strength.pct) / 100})`, transformOrigin: 'left', background: strength.color }} />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="reg-confirm" className={styles.fieldLabel}>Confirm password</label>
              <div className={styles.inputGroup}>
                <LockSimple size={18} className={styles.inputIcon} />
                <input
                  id="reg-confirm"
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'} {!loading && <ArrowRight size={18} weight="bold" />}
            </button>
          </form>

          <div className={styles.footer}>
            Already have an account?{' '}
            <Link to="/login" className={styles.footerLink}>Sign in</Link>
          </div>

          <div className={styles.trustRow}>
            <div className={styles.trustItem}><ShieldCheck size={14} weight="bold" /> Secure</div>
            <div className={styles.trustItem}><Sparkle size={14} weight="bold" /> AI-Powered</div>
            <div className={styles.trustItem}><GlobeSimple size={14} weight="bold" /> Free</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
