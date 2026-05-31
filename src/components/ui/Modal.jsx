import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const sizeMap = {
  sm: '400px',
  md: '560px', /* 560px default */
  lg: '720px', /* 720px wide */
  xl: '900px',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer,
}) {
  const closeButtonRef = useRef(null);

  // Focus trap implementation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Shift focus to the close button or modal container
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }} /* transition-fade standard ease */
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(46, 46, 46, 0.4)', /* Backdrop: rgba(46,46,46,0.4) */
            backdropFilter: 'blur(4px)', /* blur 4px */
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 400, /* z-overlay: 400 */
            padding: '16px',
          }}
        >
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            initial={{ opacity: 0, y: 16 }} /* Translate up 16px */
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }} /* transition-slow (350ms) */
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--color-bg-soft)', /* Surface: bg.soft (#F6F1E6) */
              borderRadius: 'var(--radius-xl)', /* Radius: radius-xl (16px) */
              boxShadow: 'var(--shadow-lg)', /* Shadow: shadow-lg */
              padding: '32px', /* Padding: 32px */
              width: '100%',
              maxWidth: sizeMap[size] || sizeMap.md,
              maxHeight: 'min(720px, 90vh)', /* max min(720px, 90vh) */
              overflowY: 'auto',
              position: 'relative',
              zIndex: 500, /* z-modal: 500 */
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
              {title && (
                <h2 
                  id="modal-title" 
                  style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '24px', /* Copernicus 24px */
                    fontWeight: '500', /* H3/H4 modal weight: 500 */
                    color: 'var(--color-text-primary)', 
                    margin: 0 
                  }}
                >
                  {title}
                </h2>
              )}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  width: '44px', /* 44px min hit target */
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 'auto',
                  transition: 'color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.outline = '2px solid var(--color-primary)';
                  e.target.style.outlineOffset = '2px';
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
                <X size={20} />
              </button>
            </div>

            <div style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.6 }}>
              {children}
            </div>

            {footer && (
              <div style={{ 
                marginTop: '32px', 
                paddingTop: '24px', 
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px'
              }}>
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
