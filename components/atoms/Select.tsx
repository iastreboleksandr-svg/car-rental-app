"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options?: SelectOption[];
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options = [],
  value = null,
  onChange,
  placeholder = "Выберите...",
  error,
  disabled = false,
  required = false,
  className = "",
}) => {
  const id = useId();
  const errorId = `${id}-error`;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) ?? null;
  const hasError = Boolean(error);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setOpen(false);
  };

  const triggerStyles = [
    "flex items-center justify-between w-full h-10 px-3 rounded-lg border text-sm transition-colors duration-150",
    disabled
      ? "border-gray-200 bg-gray-50 cursor-not-allowed text-gray-400"
      : hasError
      ? "border-red-400 bg-white cursor-pointer"
      : open
      ? "border-[#48C964] bg-white ring-2 ring-[#48C964]/20 cursor-pointer"
      : "border-gray-300 bg-white hover:border-gray-400 cursor-pointer",
  ].join(" ");

  return (
    <div ref={ref} className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700"}`}
        >
          {label}
          {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
        </label>
      )}

      <div
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) setOpen((prev) => !prev);
          }
          if (e.key === "Escape") setOpen(false);
        }}
        className={triggerStyles}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-gray-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full min-w-[12rem] rounded-lg border border-gray-200 bg-white shadow-lg py-1 overflow-auto max-h-60"
          style={{ width: ref.current?.offsetWidth }}
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-400">Нет вариантов</div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={[
                    "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors duration-100",
                    isSelected
                      ? "bg-[#48C964]/10 text-[#2a9043] font-medium"
                      : "text-gray-700 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {option.label}
                  {isSelected && <Check size={14} className="text-[#48C964]" />}
                </div>
              );
            })
          )}
        </div>
      )}

      {hasError && (
        <p id={errorId} className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4.5zm0 6.5a.875.875 0 1 1 0-1.75A.875.875 0 0 1 8 11z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;