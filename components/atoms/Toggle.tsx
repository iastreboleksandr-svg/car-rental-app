'use client';

import React, { useId } from 'react';

type LabelPosition = 'left' | 'right';

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labelPosition?: LabelPosition;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  label,
  labelPosition = 'right',
  disabled = false,
  className = '',
}) => {
  const id = useId();

  const handleClick = () => {
    if (!disabled) onChange?.(!checked);
  };

  const track = [
    'relative w-10 h-6 rounded-full transition-colors duration-200 shrink-0',
    disabled
      ? 'cursor-not-allowed bg-border-disabled'
      : checked
        ? 'bg-brand cursor-pointer'
        : 'bg-border-default cursor-pointer hover:bg-text-disabled',
  ].join(' ');

  const thumb = [
    'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
    checked ? 'translate-x-4' : 'translate-x-0.5',
  ].join(' ');

  const labelEl = label && (
    <span
      className={[
        'text-sm select-none',
        disabled ? 'text-text-disabled' : 'text-text-secondary',
      ].join(' ')}
    >
      {label}
    </span>
  );

  return (
    <div
      className={[
        'inline-flex items-center gap-2.5',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ].join(' ')}
      onClick={handleClick}
    >
      {labelPosition === 'left' && labelEl}

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        tabIndex={-1}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ring focus-visible:ring-offset-2 rounded-full flex items-center pointer-events-none"
      >
        <div className={track}>
          <div className={thumb} />
        </div>
      </button>

      {labelPosition === 'right' && labelEl}
    </div>
  );
};

export default Toggle;
