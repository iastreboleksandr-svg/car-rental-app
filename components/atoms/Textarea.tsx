import React, { useId } from 'react';

interface TextareaProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  showCount?: boolean;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  value = '',
  onChange,
  placeholder,
  error,
  maxLength,
  showCount = false,
  rows = 4,
  disabled = false,
  required = false,
  className = '',
}) => {
  const id = useId();
  const errorId = `${id}-error`;

  const hasError = Boolean(error);
  const isMaxReached = maxLength !== undefined && value.length >= maxLength;

  const wrapperBase = 'w-full rounded-lg border px-3 py-2.5 transition-colors duration-150';

  const wrapperState = disabled
    ? 'border-border-disabled bg-bg-disabled cursor-not-allowed'
    : isMaxReached
      ? 'border-status-warning bg-bg-card focus-within:ring-2 focus-within:ring-status-warning/30'
      : hasError
        ? 'border-border-error bg-bg-error focus-within:ring-2 focus-within:ring-border-error/30'
        : 'border-border-default bg-bg-card focus-within:border-border-focus focus-within:ring-2 focus-within:ring-brand/20';

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium ${disabled ? 'text-text-disabled' : 'text-text-secondary'}`}
        >
          {label}
          {required && (
            <span className="ml-1 text-text-error" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Textarea */}
      <textarea
        id={id}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-invalid={hasError}
        aria-describedby={error ? errorId : undefined}
        className={[
          wrapperBase,
          wrapperState,
          'text-sm resize-none outline-none',
          disabled
            ? 'text-text-disabled cursor-not-allowed placeholder:text-text-disabled'
            : 'text-text-base placeholder:text-text-placeholder',
        ].join(' ')}
      />

      {/* Footer: error + counter */}
      <div className="flex items-start justify-between gap-2">
        {/* Error */}
        {hasError ? (
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
        ) : (
          <span />
        )}

        {/* Counter */}
        {showCount && maxLength !== undefined && (
          <p
            className={`text-xs shrink-0 ${
              isMaxReached ? 'text-status-warning font-medium' : 'text-text-muted'
            }`}
          >
            {value.length} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
