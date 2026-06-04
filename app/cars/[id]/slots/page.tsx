'use client';

import { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Button from '@/components/atoms/Button';
import { ru } from 'date-fns/locale';

type SlotMode = 'available' | 'blocked';

const BOOKED_DATES = [
  new Date(2026, 5, 1),
  new Date(2026, 5, 2),
  new Date(2026, 5, 3),
  new Date(2026, 5, 4),
  new Date(2026, 5, 5),
  new Date(2026, 5, 10),
  new Date(2026, 5, 11),
  new Date(2026, 5, 12),
];

export default function CarSlotsPage() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [mode, setMode] = useState<SlotMode>('blocked');
  const [alwaysAvailable, setAlwaysAvailable] = useState(false);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);

  const handleApply = () => {
    if (!range?.from || !range?.to) return;

    const dates: Date[] = [];
    const current = new Date(range.from);
    while (current <= range.to) {
      const isBooked = BOOKED_DATES.some((d) => d.toDateString() === current.toDateString());
      if (!isBooked) dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    if (mode === 'blocked') {
      setBlockedDates((prev) => {
        const existing = new Set(prev.map((d) => d.toDateString()));
        const newDates = dates.filter((d) => !existing.has(d.toDateString()));
        return [...prev, ...newDates];
      });
    } else {
      setBlockedDates((prev) =>
        prev.filter((d) => !dates.some((nd) => nd.toDateString() === d.toDateString()))
      );
    }

    setRange(undefined);
  };

  return (
    <div className="min-h-screen bg-bg-page py-8 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        <h1 className="text-xl font-semibold text-text-base">Доступность автомобиля</h1>

        {/* Тоггл "Всегда доступна" */}
        <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-base">Всегда доступна</p>
            <p className="text-xs text-text-muted mt-0.5">
              Машина доступна по умолчанию если не заблокирована
            </p>
          </div>
          <button
            onClick={() => setAlwaysAvailable((v) => !v)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
              alwaysAvailable ? 'bg-brand' : 'bg-border-default'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-bg-card shadow transition-transform duration-200 ${
                alwaysAvailable ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Календарь */}
        <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
            Выберите диапазон дат
          </p>

          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-status-warning" />
              <span className="text-xs text-text-muted">Забронировано</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-text-error" />
              <span className="text-xs text-text-muted">Заблокировано вами</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-brand" />
              <span className="text-xs text-text-muted">Выбрано</span>
            </div>
          </div>

          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            locale={ru}
            disabled={{ before: new Date() }}
            modifiers={{
              booked: BOOKED_DATES,
              blocked: blockedDates,
            }}
            modifiersClassNames={{
              booked: 'rdp-day_booked',
              blocked: 'rdp-day_blocked',
            }}
            styles={{
              month: { width: '100%' },
            }}
          />

          <style>{`
            .rdp-day_booked button {
              background-color: #92400e !important;
              color: white !important;
              border-radius: 50% !important;
            }
            .rdp-day_blocked button {
              background-color: #b91c1c !important;
              color: white !important;
              border-radius: 50% !important;
            }
          `}</style>
        </div>

        {/* Переключатель режима */}
        <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">
            Действие для выбранных дат
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('available')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                mode === 'available'
                  ? 'bg-brand-subtle text-brand border-brand'
                  : 'text-text-muted border-border-default hover:bg-bg-page'
              }`}
            >
              ✓ Доступна
            </button>
            <button
              onClick={() => setMode('blocked')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                mode === 'blocked'
                  ? 'bg-bg-error text-text-error border-border-error'
                  : 'text-text-muted border-border-default hover:bg-bg-page'
              }`}
            >
              ✕ Заблокировать
            </button>
          </div>
        </div>

        <Button className="w-full" disabled={!range?.from || !range?.to} onClick={handleApply}>
          Применить
        </Button>
      </div>
    </div>
  );
}
