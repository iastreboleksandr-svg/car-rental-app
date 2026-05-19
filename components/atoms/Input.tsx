import React, { useId } from "react";

interface InputProps {
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  hint,
  leadingIcon,
  trailingIcon,
  disabled = false,
  readOnly = false,
  required = false,
  className = "",
}) => {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const hasError = Boolean(error);
  const isInteractive = !disabled && !readOnly;

  // Wrapper border styles
  const wrapperBase =
    "flex items-center gap-2 w-full rounded-lg border px-3 h-10 transition-colors duration-150";

  const wrapperState = disabled
    ? "border-gray-200 bg-gray-50 cursor-not-allowed"
    : readOnly
    ? "border-gray-200 bg-gray-50 cursor-default"
    : hasError
    ? "border-red-400 bg-white focus-within:ring-2 focus-within:ring-red-300 focus-within:ring-offset-0"
    : "border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100";

  // Icon color
  const iconColor = disabled
    ? "text-gray-300"
    : hasError
    ? "text-red-400"
    : "text-gray-400";

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

      {/* Input wrapper */}
      <div className={`${wrapperBase} ${wrapperState}`}>
        {/* Leading icon */}
        {leadingIcon && (
          <span className={`flex-shrink-0 w-4 h-4 ${iconColor}`} aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        {/* Native input */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={
            onChange ? (e) => onChange(e.target.value) : undefined
          }
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            [error ? errorId : null, hint ? hintId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={[
            "flex-1 min-w-0 bg-transparent text-sm outline-none",
            disabled
              ? "text-gray-400 cursor-not-allowed placeholder:text-gray-300"
              : readOnly
              ? "text-gray-600 cursor-default placeholder:text-gray-400"
              : "text-gray-900 placeholder:text-gray-400",
          ].join(" ")}
        />

        {/* Trailing icon */}
        {trailingIcon && (
          <span className={`flex-shrink-0 w-4 h-4 ${iconColor}`} aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
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
      )}

      {/* Hint (hidden when error is shown) */}
      {hint && !error && (
        <p id={hintId} className="text-xs text-gray-400">
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;