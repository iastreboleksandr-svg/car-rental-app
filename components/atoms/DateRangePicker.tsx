'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { ru } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import { ChevronDown } from 'lucide-react';

export interface BusyRange {
  from: Date;
  to: Date;
  type: 'confirmed' | 'pending';
}

interface DateRangePickerProps {
  label?: string;
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  busyRanges?: BusyRange[];
  onOpen?: () => void;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function DateRangePicker({ label, value, onChange, busyRanges = [], onOpen }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  function handleSelect(range: DateRange | undefined) {
    onChange(range);
    if (range?.from && range?.to) {
      setOpen(false);
    }
  }

  const dateLabel = value?.from
    ? value.to
      ? `${formatDate(value.from)} — ${formatDate(value.to)}`
      : `${formatDate(value.from)} — ...`
    : '';

  return (
    <div className="flex flex-col gap-1 relative" ref={ref}>
      {label && <label className="text-xs font-medium text-text-secondary">{label}</label>}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => {
            if (!v) onOpen?.();
            return !v;
          });
        }}
        className="flex items-center justify-between w-full h-10 px-3 rounded-lg border border-border-default bg-bg-card text-sm text-text-secondary hover:border-text-muted focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-brand/20 transition-colors"
      >
        <span className={dateLabel ? 'text-text-base' : 'text-text-placeholder'}>
          {dateLabel || 'Выберите даты'}
        </span>
        <ChevronDown size={16} className={`text-text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-bg-card border border-border-default rounded-2xl shadow-lg p-3">
          <DayPicker
            mode="range"
            selected={value}
            onSelect={handleSelect}
            resetOnSelect
            excludeDisabled
            locale={ru}
            disabled={[
              { before: new Date() },
              ...busyRanges.map((r) => ({ from: r.from, to: r.to })),
            ]}
            modifiers={{
              busyConfirmed: busyRanges.filter((r) => r.type === 'confirmed').map((r) => ({ from: r.from, to: r.to })),
              busyPending: busyRanges.filter((r) => r.type === 'pending').map((r) => ({ from: r.from, to: r.to })),
            }}
            modifiersClassNames={{
              busyConfirmed: 'rdp-busy-confirmed',
              busyPending: 'rdp-busy-pending',
            }}
            style={{
              '--rdp-accent-color': 'var(--brand)',
              '--rdp-accent-background-color': 'var(--brand-subtle)',
            } as React.CSSProperties}
          />
          {value?.from && (
            <button
              type="button"
              onClick={() => { onChange(undefined); setOpen(false); }}
              className="w-full text-xs text-text-muted hover:text-text-secondary mt-1 py-1"
            >
              Сбросить даты
            </button>
          )}
        </div>
      )}
    </div>
  );
}
