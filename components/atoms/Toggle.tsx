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
    'relative w-10 h-6 rounded-full transition-colors duration-200 flex-shrink-0',
    disabled
      ? 'cursor-not-allowed bg-gray-200'
      : checked
        ? 'bg-blue-600 cursor-pointer'
        : 'bg-gray-300 cursor-pointer hover:bg-gray-400',
  ].join(' ');

  const thumb = [
    'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
    checked ? 'translate-x-4' : 'translate-x-0.5',
  ].join(' ');

  const labelEl = label && (
    <span
      className={['text-sm select-none', disabled ? 'text-gray-400' : 'text-gray-700'].join(' ')}
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
        onClick={(e) => e.stopPropagation()}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
        focus-visible:ring-offset-2 rounded-full flex items-center"
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
