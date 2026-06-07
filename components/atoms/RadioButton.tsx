'use client';

import React, { useId } from 'react';

interface RadioButtonProps {
  label?: string;
  value?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value = '',
  checked = false,
  onChange,
  disabled = false,
  name,
  className = '',
}) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={[
        'inline-flex items-center gap-2.5',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ].join(' ')}
    >
      <input
        id={id}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange ? () => onChange(value) : undefined}
        disabled={disabled}
        name={name}
        className="sr-only"
      />

      <span
        aria-hidden="true"
        className={[
          'w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors duration-150',
          disabled
            ? 'border-gray-200 bg-gray-100'
            : checked
              ? 'border-brand bg-white'
              : 'border-border-default bg-white hover:border-brand',
        ].join(' ')}
      >
        {checked && (
          <span
            className={['w-2 h-2 rounded-full', disabled ? 'bg-text-disabled' : 'bg-brand'].join(
              ' '
            )}
          />
        )}
      </span>
      {label && <span className="text-sm text-text-secondary select-none">{label}</span>}
    </label>
  );
};

export default RadioButton;
