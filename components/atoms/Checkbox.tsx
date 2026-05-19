"use client";

import React, { useId, useEffect, useRef } from "react";

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
  className = "",
}) => {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);

  // indeterminate не управляется через атрибут HTML — только через JS
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const boxStyles = [
    "w-4 h-4 rounded border-2 flex-shrink-0 transition-colors duration-150",
    disabled
      ? "border-gray-200 bg-gray-100 cursor-not-allowed"
      : checked || indeterminate
      ? "border-blue-600 bg-blue-600 cursor-pointer"
      : "border-gray-300 bg-white cursor-pointer hover:border-blue-400",
  ].join(" ");

  return (
    <label
      htmlFor={id}
      className={[
        "inline-flex items-center gap-2.5",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      {/* Скрытый нативный input */}
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
        disabled={disabled}
        className="sr-only"
      />

      {/* Кастомный чекбокс */}
      <span className={boxStyles} aria-hidden="true">
        {/* Галочка */}
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

        {/* Indeterminate — тире */}
        {indeterminate && (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-0.5"
          >
            <path
              d="M2.5 6h7"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>

      {/* Label */}
      {label && (
        <span className="text-sm text-gray-700 select-none">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;