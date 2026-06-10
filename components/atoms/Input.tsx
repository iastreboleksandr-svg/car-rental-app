import React, { useId } from 'react';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  hint,
  leadingIcon,
  trailingIcon,
  disabled = false,
  readOnly = false,
  required = false,
  autoComplete,
  className = '',
}) => {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const hasError = Boolean(error);

  const wrapperBase =
    'flex items-center gap-2 w-full rounded-lg border px-3 h-10 transition-colors duration-150';

  const wrapperState = disabled
    ? 'border-border-disabled bg-bg-disabled cursor-not-allowed'
    : readOnly
      ? 'border-border-disabled bg-bg-disabled cursor-default'
      : hasError
        ? 'border-border-error bg-bg-error focus-within:ring-2 focus-within:ring-border-error/30'
        : 'border-border-default bg-bg-card focus-within:border-border-focus focus-within:ring-2 focus-within:ring-brand/20';

  const iconColor = disabled
    ? 'text-text-disabled'
    : hasError
      ? 'text-text-error'
      : 'text-text-muted';

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium ${
            disabled ? 'text-text-disabled' : 'text-text-secondary'
          }`}
        >
          {label}
          {required && (
            <span className="ml-1 text-text-error" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className={`${wrapperBase} ${wrapperState}`}>
        {leadingIcon && (
          <span className={`shrink-0 w-4 h-4 ${iconColor}`} aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={
            [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined
          }
          className={[
            'flex-1 min-w-0 bg-transparent text-sm outline-none',
            disabled
              ? 'text-text-disabled cursor-not-allowed placeholder:text-text-disabled'
              : readOnly
                ? 'text-text-secondary cursor-default placeholder:text-text-placeholder'
                : 'text-text-base placeholder:text-text-placeholder',
          ].join(' ')}
        />

        {trailingIcon && (
          <span className={`shrink-0 w-4 h-4 ${iconColor}`} aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </div>

      {error && (
        <p id={errorId} className="text-xs text-text-error flex items-center gap-1">
          <svg
          
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4.5zm0 6.5a.875.875 0 1 1 0-1.75A.875.875 0 0 1 8 11z" />
          </svg>
          {error}
        </p>
      )}

      {hint && !error && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
