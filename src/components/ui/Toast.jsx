import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const borderColors = {
  success: 'var(--color-primary)',
  error:   'var(--color-error)',
  warning: 'var(--color-warning)',
  info:    'var(--color-info)',
};

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback((variant, message) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, variant, message }]);
    setTimeout(() => dismiss(id), 4000);
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
              background: 'var(--color-bg-soft)', /* Surface bg-soft (#F6F1E6) */
              borderLeft: `4px solid ${borderColors[t.variant] || 'var(--color-primary)'}`,
              boxShadow: 'var(--shadow-lg)', /* shadow-lg for floating overlays */
              borderRadius: 'var(--radius-xl)', /* Radius: 16px radius-xl */
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
              fontSize: '14px', /* StyreneB 14px */
              color: 'var(--color-text-primary)', 
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
                color: 'var(--color-text-secondary)',
                padding: '4px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                outline: 'none',
                transition: 'color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)'
              }}
              onFocus={(e) => {
                e.target.style.outline = '2px solid var(--color-primary)';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.background = 'var(--color-bg-surface)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
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
