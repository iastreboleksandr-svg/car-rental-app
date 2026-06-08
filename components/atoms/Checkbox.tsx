'use client';

import React, { useId, useEffect, useRef } from 'react';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  indeterminate = false,
  className = '',
}) => {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const boxStyles = [
    "w-4 h-4 rounded border-2 shrink-0 transition-colors duration-150",
    disabled
      ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
      : checked || indeterminate
        ? 'border-brand bg-brand cursor-pointer'
        : 'border-border-default bg-bg-card cursor-pointer hover:border-brand',
  ].join(' ');

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
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
        disabled={disabled}
        className="sr-only"
      />

      <span className={boxStyles} aria-hidden="true">
        {checked && !indeterminate && (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-0.5"
          >
            <path
              d="M2 6l3 3 5-5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {indeterminate && (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-0.5"
          >
            <path d="M2.5 6h7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </span>

      {label && <span className="text-sm text-text-secondary select-none">{label}</span>}
    </label>
  );
};

export default Checkbox;
