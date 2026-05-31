import React from 'react';
import { Loader2 } from 'lucide-react';

const sizeStyles = {
  sm: { height: '36px', padding: '0 16px', fontSize: '14px' },
  md: { height: '44px', padding: '0 24px', fontSize: '16px' },
  lg: { height: '52px', padding: '0 32px', fontSize: '18px' },
};

const variantStyles = {
  primary: {
    background: 'var(--color-primary)',
    color: 'var(--color-text-primary)',
    border: 'none',
    boxShadow: 'none',
    '--btn-hover-bg': 'var(--color-hover)',
    '--btn-active-bg': 'var(--color-active)',
    '--btn-focus-color': 'var(--color-text-primary)',
  },
  secondary: {
    background: 'var(--color-bg-soft)',
    color: 'var(--color-text-primary)',
    border: 'none',
    boxShadow: 'var(--shadow-sm)',
    '--btn-hover-bg': 'var(--color-bg-surface)',
    '--btn-active-bg': 'var(--color-bg-surface)',
    '--btn-focus-color': 'var(--color-primary)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-active)',
    border: 'none',
    boxShadow: 'none',
    '--btn-hover-bg': 'transparent',
    '--btn-active-bg': 'transparent',
    '--btn-focus-color': 'var(--color-primary)',
    textDecoration: 'none',
  },
  danger: {
    background: 'var(--color-error)',
    color: 'var(--color-text-inverse)',
    border: 'none',
    boxShadow: 'none',
    '--btn-hover-bg': '#A6493D',
    '--btn-active-bg': '#8E3D32',
    '--btn-focus-color': 'var(--color-text-primary)',
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...rest
}) {
  const isDisabled = disabled || loading;
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActiveState, setIsActiveState] = React.useState(false);

  const currentStyles = variantStyles[variant] || variantStyles.primary;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  // Determine standard background, shadow, and transition states
  let bg = currentStyles.background;
  let textCol = currentStyles.color;
  let shadow = currentStyles.boxShadow;

  if (!isDisabled) {
    if (isHovered) {
      bg = currentStyles['--btn-hover-bg'];
      if (variant === 'secondary') shadow = 'var(--shadow-md)';
    }
    if (isActiveState) {
      bg = currentStyles['--btn-active-bg'];
      if (variant === 'secondary') shadow = 'var(--shadow-xs)';
    }
  }

  // Handle Tertiary/Ghost specific decoration
  let textDecoration = 'none';
  if (variant === 'ghost' && isHovered && !isDisabled) {
    textCol = '#5F7A4B';
    textDecoration = 'underline';
  } else if (variant === 'ghost' && isActiveState && !isDisabled) {
    textCol = '#5F7A4B';
    textDecoration = 'underline';
  }

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-lg)', /* Strictly 12px */
    fontWeight: '500', /* Button weight is locked to 500 */
    fontFamily: 'var(--font-body)',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.4 : 1,
    transition: 'background var(--duration-fast) var(--ease-standard), opacity var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
    whiteSpace: 'nowrap',
    outline: 'none',
    boxSizing: 'border-box',
    textDecoration,
    background: bg,
    color: textCol,
    boxShadow: shadow,
    textUnderlineOffset: variant === 'ghost' ? '3px' : undefined,
    border: 'none',
    position: 'relative',
    ...sizeStyle,
    
    // Focus visible indicator logic
    ...(isFocused ? {
      outline: `2px solid ${currentStyles['--btn-focus-color']}`,
      outlineOffset: '3px',
      borderRadius: variant === 'ghost' ? '4px' : 'var(--radius-lg)',
    } : {}),

    ...style,
  };

  return (
    <button
      type={type}
      className={`altair-btn altair-btn--${variant} altair-btn--${size}${className ? ` ${className}` : ''}`}
      style={baseStyle}
      disabled={isDisabled}
      onClick={onClick}
      onFocus={(e) => {
        if (e.target.matches(':focus-visible')) {
          setIsFocused(true);
        }
      }}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActiveState(false);
      }}
      onMouseDown={() => !isDisabled && setIsActiveState(true)}
      onMouseUp={() => setIsActiveState(false)}
      {...rest}
    >
      {loading && <Loader2 size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="altair-spin animate-spin" aria-hidden="true" />}
      <span style={loading ? { opacity: 0, position: 'absolute' } : undefined}>{children}</span>
      {loading && <span className="sr-only">Loading...</span>}
    </button>
  );
}
