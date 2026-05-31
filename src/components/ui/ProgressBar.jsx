import React from 'react';

export default function ProgressBar({
  value = 0,
  indeterminate = false,
  showLabel = false,
  className = '',
  style = {},
  ...rest
}) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div 
      className={className} 
      style={{ display: 'flex', flexDirection: 'column', gap: '8px', ...style }}
      {...rest}
    >
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '14px', color: 'var(--color-text-primary)', fontWeight: '500', fontFamily: 'var(--font-body)' }}>
            {indeterminate ? 'Loading...' : `${clamped}%`}
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : 100}
        style={{
          width: '100%',
          height: '8px', /* Height exactly 8px */
          background: 'var(--color-bg-surface)', /* Track bg is bg-surface (#D6C4AB) */
          borderRadius: 'var(--radius-pill)', /* Track is pill shape */
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--color-primary)', /* Fill is primary (#A3B18A) */
            
            // Determinate properties
            ...(!indeterminate ? {
              width: `${clamped}%`,
              transition: 'width 400ms var(--ease-expo-out)', /* 400ms cubic-bezier(0.16,1,0.3,1) */
            } : {
              // Indeterminate shimmer animation properties
              width: '40%',
              position: 'absolute',
              top: 0,
              bottom: 0,
              animation: 'altair-progress-indeterminate 1400ms infinite var(--ease-standard)',
            }),
          }}
        />
      </div>
      <style>{`
        @keyframes altair-progress-indeterminate {
          0% {
            left: -40%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
