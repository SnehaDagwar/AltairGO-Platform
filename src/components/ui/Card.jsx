import React from 'react';

const paddingMap = {
  none: '0',
  sm: 'var(--space-4)',  /* 16px */
  md: 'var(--space-6)',  /* 24px */
  lg: 'var(--space-8)',  /* 32px */
};

const variantStyles = {
  default: {
    background: 'var(--color-bg-soft)',
    border: '1px solid var(--color-border-subtle)',
    boxShadow: 'var(--shadow-sm)',
  },
  elevated: {
    background: 'var(--color-bg-soft)',
    border: 'none',
    boxShadow: 'var(--shadow-lg)',
  },
  bordered: {
    background: 'var(--color-bg-soft)',
    border: '1px solid var(--color-border-strong)',
    boxShadow: 'none',
  },
};

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
  className = '',
  style = {},
  ...rest
}) {
  const isClickable = !!onClick || hover;
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const activeVariantStyle = variantStyles[variant] || variantStyles.default;

  const cardStyle = {
    borderRadius: 'var(--radius-xl)', /* radius-xl (16px) */
    overflow: 'hidden',
    transition: 'transform var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard)',
    cursor: isClickable ? 'pointer' : undefined,
    padding: paddingMap[padding],
    boxSizing: 'border-box',
    ...activeVariantStyle,
    
    // Hover lifts precisely translateY(-2px) with shadow-md
    ...(isHovered && isClickable ? {
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-md)',
    } : {}),

    // Keyboard focus styling
    ...(isFocused ? {
      outline: '2px solid var(--color-primary)',
      outlineOffset: '3px',
      boxShadow: 'var(--shadow-md)',
    } : {}),

    ...style,
  };

  return (
    <div
      className={`altair-card${className ? ` ${className}` : ''}`}
      onClick={onClick}
      onFocus={(e) => {
        if (e.target.matches(':focus-visible')) {
          setIsFocused(true);
        }
      }}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={onClick ? 0 : undefined}
      style={cardStyle}
      {...rest}
    >
      {children}
    </div>
  );
}
