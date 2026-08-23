import React from 'react';
import { Loader2 } from 'lucide-react';

const sizeStyles = {
  sm: { height: '36px', padding: '0 16px', fontSize: '0.875rem' },
  md: { height: '44px', padding: '0 24px', fontSize: '1rem' },
  lg: { height: '52px', padding: '0 32px', fontSize: '1.125rem' },
};

export default function Button({
  variant = 'primary', // primary, glass, secondary, danger, ghost
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

  // Map legacy variants to new v5 classes
  let variantClass = 'btn-primary';
  if (variant === 'secondary' || variant === 'glass') {
    variantClass = 'btn-glass';
  } else if (variant === 'ghost') {
    variantClass = 'btn-glass';
  } else if (variant === 'danger') {
    variantClass = 'btn-danger';
  }

  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  const baseStyle = {
    ...sizeStyle,
    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    ...(variant === 'danger' ? { background: '#E53E3E', color: 'white' } : {}),
    ...(variant === 'ghost' ? { background: 'transparent', border: 'none', boxShadow: 'none' } : {}),
    ...style,
  };

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${className}`}
      style={baseStyle}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {loading && <Loader2 size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="animate-spin" aria-hidden="true" style={{ animation: 'spin 1s linear infinite' }} />}
      <span style={loading ? { opacity: 0, position: 'absolute' } : { display: 'flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
      {loading && <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>Loading...</span>}
    </button>
  );
}
