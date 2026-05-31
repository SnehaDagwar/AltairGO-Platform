import React from 'react';

const variantStyles = {
  default: { 
    background: 'var(--color-bg-surface)', 
    color: 'var(--color-text-primary)' 
  },
  primary: { 
    background: 'var(--color-bg-soft)', 
    color: 'var(--color-primary)' 
  },
  success: { 
    background: 'var(--color-success-surface)', 
    color: 'var(--color-success)' 
  },
  info: { 
    background: 'var(--color-info-surface)', 
    color: 'var(--color-info)' 
  },
  warning: { 
    background: 'var(--color-warning-surface)', 
    color: 'var(--color-warning)' 
  },
  error: { 
    background: 'var(--color-error-surface)', 
    color: 'var(--color-error)' 
  },
  accent: { 
    background: 'var(--color-accent)', 
    color: 'var(--color-text-primary)',
    fontWeight: '500'
  },
  'ai-pick': { 
    background: 'var(--color-accent)', 
    color: 'var(--color-text-primary)',
    fontWeight: '500'
  },
};

const sizeStyles = {
  sm: { fontSize: '12px', padding: '2px 8px' },
  md: { fontSize: '14px', padding: '6px 14px' }, /* Pill padding matches default pill '6px 14px' */
};

export default function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  style = {},
  ...rest
}) {
  const activeStyle = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`altair-badge altair-badge--${variant}${className ? ` ${className}` : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-pill)', /* pill shape is exactly 9999px */
        fontWeight: activeStyle.fontWeight || '400', /* Default pill/badge weight is 400, except active chips and AI pick */
        fontFamily: 'var(--font-body)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...sizeStyles[size],
        ...activeStyle,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
