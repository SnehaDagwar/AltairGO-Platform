import React from 'react';

const variantStyles = {
  default: { 
    background: 'var(--surface)', 
    color: 'var(--fg)' 
  },
  primary: { 
    background: 'var(--color-teal)', 
    color: '#FFF' 
  },
  success: { 
    background: 'oklch(95% 0.05 150)', 
    color: 'oklch(40% 0.1 150)' 
  },
  info: { 
    background: 'var(--color-ice)', 
    color: 'oklch(40% 0.1 240)' 
  },
  warning: { 
    background: 'var(--color-cream)', 
    color: 'oklch(50% 0.1 60)' 
  },
  error: { 
    background: 'var(--color-peach)', 
    color: 'oklch(45% 0.15 20)' 
  },
  accent: { 
    background: 'var(--color-lavender)', 
    color: 'var(--color-black)',
    fontWeight: '500'
  },
  'ai-pick': { 
    background: 'var(--color-lavender)', 
    color: 'var(--color-black)',
    fontWeight: '500'
  },
};

const sizeStyles = {
  sm: { fontSize: '12px', padding: '2px 8px' },
  md: { fontSize: '14px', padding: '6px 14px' },
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
      className={`badge badge--${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-pill)',
        fontWeight: activeStyle.fontWeight || '400',
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
