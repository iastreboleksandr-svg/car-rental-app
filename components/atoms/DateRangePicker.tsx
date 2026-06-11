'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { ru, enUS, de } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import { ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

const DP_LOCALES = { ru, en: enUS, de } as const;

export interface BusyRange {
  from: Date;
  to: Date;
  type: 'confirmed' | 'pending' | 'blocked';
}

export interface AvailableRange {
  from: Date;
  to: Date;
}

interface DateRangePickerProps {
  label?: string;
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  busyRanges?: BusyRange[];
  blockedRanges?: BusyRange[];
  availableRanges?: AvailableRange[];
  onOpen?: () => void;
}

function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function DateRangePicker({
  label,
  value,
  onChange,
  busyRanges = [],
  blockedRanges = [],
  availableRanges = [],
  onOpen,
}: DateRangePickerProps) {
  const locale = useLocale();
  const t = useTranslations('calendar');
  const dpLocale = DP_LOCALES[locale as keyof typeof DP_LOCALES] ?? ru;
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
      ? `${formatDate(value.from, locale)} — ${formatDate(value.to, locale)}`
      : `${formatDate(value.from, locale)} — ...`
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
          {dateLabel || t('selectDates')}
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
            locale={dpLocale}
            disabled={[
              { before: new Date() },
              ...busyRanges
                .filter((r) => r.type === 'confirmed')
                .map((r) => ({ from: r.from, to: r.to })),
              ...blockedRanges.map((r) => ({ from: r.from, to: r.to })),
              (day: Date) => {
                if (availableRanges.length === 0) return false;
                const d = startOfDay(day).getTime();
                return !availableRanges.some(
                  (r) => d >= startOfDay(r.from).getTime() && d <= startOfDay(r.to).getTime(),
                );
              },
            ]}
            modifiers={{
              busyConfirmed: busyRanges.filter((r) => r.type === 'confirmed').map((r) => ({ from: r.from, to: r.to })),
              busyPending: busyRanges.filter((r) => r.type === 'pending').map((r) => ({ from: r.from, to: r.to })),
              busyBlocked: blockedRanges.map((r) => ({ from: r.from, to: r.to })),
            }}
            modifiersClassNames={{
              busyConfirmed: 'rdp-busy-confirmed',
              busyPending: 'rdp-busy-pending',
              busyBlocked: 'rdp-busy-blocked',
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
              {t('resetDates')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
