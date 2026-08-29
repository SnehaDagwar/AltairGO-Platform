import React from 'react';

const paddingMap = {
  none: '0',
  sm: '16px',
  md: '24px',
  lg: '32px',
};

export default function Card({
  children,
  padding,
  hover = false,
  onClick,
  className = '',
  style = {},
  ...rest
}) {
  const isClickable = !!onClick || hover;

  const cardStyle = {
    cursor: isClickable ? 'pointer' : undefined,
    ...(padding ? { padding: paddingMap[padding] } : {}),
    ...style,
  };

  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      } : undefined}
      style={cardStyle}
      {...rest}
    >
      {children}
    </div>
  );
}
