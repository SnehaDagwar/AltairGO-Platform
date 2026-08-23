import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const borderColors = {
  success: 'oklch(40% 0.1 150)',
  error:   'var(--color-peach)',
  warning: 'var(--color-cream)',
  info:    'var(--color-ice)',
};

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);
  const timersRef = useRef(new Set());

  useEffect(() => {
    const timers = timersRef.current;
    return () => { timers.forEach(clearTimeout); timers.clear(); };
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback((variant, message) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, variant, message }]);
    const timer = setTimeout(() => {
      timersRef.current.delete(timer);
      dismiss(id);
    }, 4000);
    timersRef.current.add(timer);
  }, [dismiss]);

  const toast = {
    success: (msg) => add('success', msg),
    error:   (msg) => add('error', msg),
    warning: (msg) => add('warning', msg),
    info:    (msg) => add('info', msg),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px', /* space-6 */
        right: '24px',  /* space-6 */
        zIndex: 600,    /* z-toast: 600 */
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',    /* space-3 */
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }} /* transition-fade ease */
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              borderLeft: `4px solid ${borderColors[t.variant] || 'var(--color-black)'}`,
              boxShadow: 'var(--shadow-lg)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              maxWidth: '360px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              pointerEvents: 'all',
              overflow: 'hidden',
            }}
          >
            <span style={{ 
              flex: 1, 
              fontSize: '1rem',
              color: 'var(--fg)', 
              fontFamily: 'var(--font-body)',
              fontWeight: '400',
              lineHeight: 1.5 
            }}>
              {t.message}
            </span>
            <button
              onClick={() => onDismiss(t.id)}
              aria-label="Dismiss notification"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted)',
                padding: '4px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                outline: 'none',
                transition: 'color var(--t-hover), background var(--t-hover)'
              }}
              onFocus={(e) => {
                e.target.style.outline = '2px solid var(--color-black)';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--fg)';
                e.currentTarget.style.background = 'var(--surface)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--muted)';
                e.currentTarget.style.background = 'none';
              }}
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
