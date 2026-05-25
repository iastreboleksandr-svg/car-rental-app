'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { ru } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import { ChevronDown } from 'lucide-react';

interface DateRangePickerProps {
  label?: string;
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function DateRangePicker({ label, value, onChange }: DateRangePickerProps) {
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
      {label && <label className="text-xs font-medium text-gray-700">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
      >
        <span className={dateLabel ? 'text-gray-900' : 'text-gray-400'}>
          {dateLabel || 'Выберите даты'}
        </span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-2xl shadow-lg p-3">
          <DayPicker
            mode="range"
            selected={value}
            onSelect={handleSelect}
            resetOnSelect
            locale={ru}
            disabled={{ before: new Date() }}
            style={{
              '--rdp-accent-color': '#3b82f6',
              '--rdp-accent-background-color': '#eff6ff',
            } as React.CSSProperties}
          />
          {value?.from && (
            <button
              type="button"
              onClick={() => { onChange(undefined); setOpen(false); }}
              className="w-full text-xs text-gray-400 hover:text-gray-600 mt-1 py-1"
            >
              Сбросить даты
            </button>
          )}
        </div>
      )}
    </div>
  );
}
