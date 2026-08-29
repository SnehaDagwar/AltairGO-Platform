import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Input({
  label,
  id,
  error,
  hint,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  style = {},
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', ...style }} className={className}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--fg)',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--color-peach)', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onFocus={(e) => {
          setFocused(true);
          if (e.target.matches(':focus-visible')) {
            setIsFocusVisible(true);
          }
        }}
        onBlur={() => {
          setFocused(false);
          setIsFocusVisible(false);
        }}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        style={{
          width: '100%',
          height: '44px',
          border: error 
            ? '1px solid var(--color-peach)' 
            : focused 
              ? '1px solid var(--color-teal)' 
              : '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          fontWeight: '400',
          background: disabled ? 'var(--surface)' : 'var(--glass-bg)',
          backdropFilter: disabled ? 'none' : 'var(--glass-blur)',
          color: 'var(--fg)',
          outline: 'none',
          boxShadow: isFocusVisible ? '0 0 0 2px var(--color-teal)' : 'var(--shadow-sm)',
          outlineOffset: isFocusVisible ? '3px' : undefined,
          transition: 'border-color var(--t-hover), box-shadow var(--t-hover)',
          cursor: disabled ? 'not-allowed' : undefined,
          opacity: disabled ? 0.6 : 1,
          boxSizing: 'border-box',
        }}
        {...rest}
      />
      {error && (
        <span 
          id={`${id}-error`}
          style={{ 
            color: 'var(--color-peach)', 
            fontSize: '0.875rem', 
            marginTop: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'var(--font-body)',
            fontWeight: '400'
          }}
        >
          <AlertCircle size={16} />
          {error}
        </span>
      )}
      {!error && hint && (
        <span 
          id={`${id}-hint`}
          style={{ 
            color: 'var(--muted)', 
            fontSize: '0.875rem', 
            marginTop: '4px',
            fontFamily: 'var(--font-body)',
            fontWeight: '400'
          }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
