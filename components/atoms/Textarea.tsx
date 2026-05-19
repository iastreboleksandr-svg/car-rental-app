import React, { useId } from "react";

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
  value = "",
  onChange,
  placeholder,
  error,
  maxLength,
  showCount = false,
  rows = 4,
  disabled = false,
  required = false,
  className = "",
}) => {
  const id = useId();
  const errorId = `${id}-error`;

  const hasError = Boolean(error);
  const isMaxReached = maxLength !== undefined && value.length >= maxLength;

  const wrapperBase =
    "w-full rounded-lg border px-3 py-2.5 transition-colors duration-150";

  const wrapperState = disabled
    ? "border-gray-200 bg-gray-50 cursor-not-allowed"
    : isMaxReached
    ? "border-orange-400 bg-white focus-within:ring-2 focus-within:ring-orange-300"
    : hasError
    ? "border-red-400 bg-white focus-within:ring-2 focus-within:ring-red-300"
    : "border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100";

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium ${
            disabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
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
          "text-sm resize-none outline-none",
          disabled
            ? "text-gray-400 cursor-not-allowed placeholder:text-gray-300"
            : "text-gray-900 placeholder:text-gray-400",
        ].join(" ")}
      />

      {/* Footer: error + counter */}
      <div className="flex items-start justify-between gap-2">
        {/* Error */}
        {hasError ? (
          <p id={errorId} className="text-xs text-red-500 flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
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
            className={`text-xs flex-shrink-0 ${
              isMaxReached ? "text-orange-500 font-medium" : "text-gray-400"
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