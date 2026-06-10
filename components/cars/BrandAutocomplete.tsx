'use client';

import { useId, useRef, useState } from 'react';
import { BRAND_SUGGESTIONS } from '@/lib/carForm';

interface BrandAutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Brand text input with a hardcoded suggestion dropdown (MVP).
 * Visually matches the Input atom from the design system.
 */
export function BrandAutocomplete({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
}: BrandAutocompleteProps) {
  const id = useId();
  const listId = `${id}-list`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const hasError = Boolean(error);

  const query = value.trim().toLowerCase();
  const matches = BRAND_SUGGESTIONS.filter(
    (b) => b.toLowerCase().includes(query) && b.toLowerCase() !== query,
  );
  const showList = open && matches.length > 0;

  const wrapperState = disabled
    ? 'border-border-disabled bg-bg-disabled cursor-not-allowed'
    : hasError
      ? 'border-border-error bg-bg-error focus-within:ring-2 focus-within:ring-border-error/30'
      : 'border-border-default bg-bg-card focus-within:border-border-focus focus-within:ring-2 focus-within:ring-brand/20';

  function commit() {
    setOpen(false);
    onBlur?.();
  }

  return (
    <div ref={wrapRef} className="relative flex w-full flex-col gap-1">
      <label
        htmlFor={id}
        className={`text-sm font-medium ${disabled ? 'text-text-disabled' : 'text-text-secondary'}`}
      >
        {label}
        {required && (
          <span className="ml-1 text-text-error" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className={`flex h-10 w-full items-center rounded-lg border px-3 transition-colors duration-150 ${wrapperState}`}>
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(commit, 120)}
          className="min-w-0 flex-1 bg-transparent text-sm text-text-base outline-none placeholder:text-text-placeholder disabled:cursor-not-allowed"
        />
      </div>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-auto rounded-lg border border-border-default bg-bg-card py-1 shadow-lg"
        >
          {matches.map((brand) => (
            <li
              key={brand}
              role="option"
              aria-selected={false}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(brand);
                setOpen(false);
                onBlur?.();
              }}
              className="cursor-pointer px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-brand-subtle hover:text-brand"
            >
              {brand}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-xs text-text-error">{error}</p>}
    </div>
  );
}

export default BrandAutocomplete;
