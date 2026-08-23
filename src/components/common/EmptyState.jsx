import React from 'react';

export default function EmptyState({
  icon: IconComponent,
  title,
  description,
  action,
  className = '',
  style = {},
  ...rest
}) {
  return (
    <div
      className={`altair-empty-state${className ? ` ${className}` : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: '480px', /* max-width: 480px */
        margin: '0 auto',
        padding: '64px 24px', /* 64px minimum top/bottom padding */
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {IconComponent && (
        <div style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Render the icon component directly or pass a custom node */}
          {React.isValidElement(IconComponent) ? (
            IconComponent
          ) : (
            <IconComponent size={48} strokeWidth={2} /> /* icon-xl (48px) outline, 2px stroke */
          )}
        </div>
      )}
      
      {title && (
        <h3 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '2rem',
          fontWeight: '400',
          color: 'var(--fg)', 
          marginTop: '16px',
          marginBottom: 0,
          lineHeight: 1.3
        }}>
          {title}
        </h3>
      )}

      {description && (
        <p style={{ 
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          fontWeight: '400',
          color: 'var(--muted)', 
          marginTop: '8px',
          marginBottom: 0,
          lineHeight: 1.6,
          maxWidth: '360px',
        }}>
          {description}
        </p>
      )}

      {action && (
        <div style={{ marginTop: '24px' }}> {/* margin-top: 24px */}
          {action}
        </div>
      )}
    </div>
  );
}
