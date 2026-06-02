import React from 'react';

const typeHeights = {
  caption: '12px',
  body: '16px',
  h3: '24px',
  h2: '32px',
};

export default function Skeleton({
  variant = 'body', // caption, body, h3, h2, or custom
  width = '100%',
  height,
  borderRadius = 'var(--radius-sm)',
  count = 1,
  className = '',
  style = {},
  ...rest
}) {
  const finalHeight = height || typeHeights[variant] || '16px';

  const baseSkeletonStyle = {
    display: 'block',
    width,
    height: finalHeight,
    borderRadius,
    background: 'var(--surface)', 
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
    ...style,
  };

  const renderSkeleton = (key) => (
    <span 
      key={key} 
      style={baseSkeletonStyle} 
      aria-hidden="true"
      {...rest}
    >
      <span style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)',
        animation: 'altair-skeleton-shimmer 1400ms infinite linear', /* transition-shimmer: 1400ms loop */
      }} />
    </span>
  );

  return (
    <div 
      className={className} 
      style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
      <style>{`
        @keyframes altair-skeleton-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
