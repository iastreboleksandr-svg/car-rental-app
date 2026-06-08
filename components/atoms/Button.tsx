import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'danger-outline' | 'ghost' | 'green';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-text-inverse hover:bg-brand-hover active:bg-brand-active border border-transparent',
  secondary: 'bg-bg-card text-text-base hover:bg-gray-50 active:bg-gray-100 border border-border-default',
  danger: 'bg-red-700 text-text-inverse hover:bg-red-800 active:bg-red-900 border border-transparent',
  'danger-outline': 'bg-transparent text-red-600 hover:bg-red-50 active:bg-red-100 border border-red-300 hover:border-red-400',
  ghost: 'bg-transparent text-text-secondary hover:bg-gray-100 active:bg-gray-200 border border-transparent',
  green: 'bg-brand text-text-inverse hover:bg-brand-hover active:bg-brand-active border border-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const Spinner = ({ size }: { size: ButtonSize }) => (
  <svg
    className={`animate-spin ${iconSizeStyles[size]}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  children,
  className = '',
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium rounded-lg',
        'transition-colors duration-150 ease-in-out',
        'focus-visible:ring-2 focus-visible:ring-brand-ring focus-visible:ring-offset-2',
        'select-none cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-busy={loading}
      aria-disabled={isDisabled}
    >
      {loading ? (
        <Spinner size={size} />
      ) : leftIcon ? (
        <span className={`shrink-0 ${iconSizeStyles[size]}`} aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}

      {children && <span>{children}</span>}

      {!loading && rightIcon && (
        <span className={`shrink-0 ${iconSizeStyles[size]}`} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
