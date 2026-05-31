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
            fontSize: '14px',
            fontWeight: '400', /* UI Label / Tag / input weight is 400 */
            color: 'var(--color-text-primary)',
            marginBottom: '8px', /* Label -> Input: 8px */
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--color-error)', marginLeft: '4px' }}>*</span>}
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
          height: '44px', /* Min height 44px */
          border: error 
            ? '1.5px solid var(--color-error)' 
            : focused 
              ? '1.5px solid var(--color-border-focus)' 
              : 'none', /* No border at rest */
          borderRadius: 'var(--radius-sm)', /* radius-sm (8px) */
          padding: '12px 16px', /* Padding 12px 16px */
          fontSize: '16px', /* StyreneB 16px */
          fontFamily: 'var(--font-body)',
          fontWeight: '400',
          background: disabled 
            ? 'rgba(214, 196, 171, 0.5)' /* bg.surface @ 50% opacity */
            : 'var(--color-bg-surface)', /* bg.surface */
          color: 'var(--color-text-primary)',
          outline: 'none',
          boxShadow: isFocusVisible ? '0 0 0 2px var(--color-border-focus)' : 'none',
          outlineOffset: isFocusVisible ? '3px' : undefined,
          transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
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
            color: 'var(--color-error)', 
            fontSize: '14px', 
            marginTop: '4px', /* Input -> Helper text: 4px */
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
            color: 'var(--color-text-secondary)', 
            fontSize: '14px', 
            marginTop: '4px', /* Input -> Helper text: 4px */
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
