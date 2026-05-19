import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border border-transparent",
  secondary:
    "bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100 border border-gray-300",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border border-transparent",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const Spinner = ({ size }: { size: ButtonSize }) => (
  <svg
    className={`animate-spin ${iconSizeStyles[size]}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
  type = "button",
  children,
  className = "",
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        // base
        "inline-flex items-center justify-center font-medium rounded-lg",
        "transition-colors duration-150 ease-in-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "select-none cursor-pointer",
        // variant
        variantStyles[variant],
        // size
        sizeStyles[size],
        // disabled / loading
        isDisabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={loading}
      aria-disabled={isDisabled}
    >
      {/* Left icon or spinner */}
      {loading ? (
        <Spinner size={size} />
      ) : leftIcon ? (
        <span className={`flex-shrink-0 ${iconSizeStyles[size]}`} aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}

      {/* Label */}
      {children && <span>{children}</span>}

      {/* Right icon (hidden when loading) */}
      {!loading && rightIcon && (
        <span className={`flex-shrink-0 ${iconSizeStyles[size]}`} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;