'use client';

import React from 'react';
import type { Slot, SlotType } from '@/types/slot';

interface SlotCalendarProps {
  month: Date; // any date within the month to render
  slots: Slot[];
  selStart: Date | null;
  selEnd: Date | null;
  today: Date;
  weekdayLabels: string[]; // Monday-first
  caption?: string; // optional month caption rendered above the grid
  onDayClick: (day: Date) => void;
}

// Local Y-M-D key (avoids timezone shifts when comparing against ISO slot dates).
const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function slotForDay(slots: Slot[], day: Date): Slot | undefined {
  const k = ymd(day);
  return slots.find((s) => s.dateFrom.slice(0, 10) <= k && k <= s.dateTo.slice(0, 10));
}

function inSelection(day: Date, start: Date | null, end: Date | null): boolean {
  if (!start) return false;
  const k = ymd(day);
  const a = ymd(start);
  const b = end ? ymd(end) : a;
  const lo = a < b ? a : b;
  const hi = a < b ? b : a;
  return lo <= k && k <= hi;
}

const TYPE_CELL: Record<SlotType, string> = {
  available: 'bg-green-50 text-green-700',
  blocked: 'bg-rose-50 text-rose-600',
  booked: 'bg-blue-50 text-blue-600',
};

export const SlotCalendar: React.FC<SlotCalendarProps> = ({
  month,
  slots,
  selStart,
  selEnd,
  today,
  weekdayLabels,
  caption,
  onDayClick,
}) => {
  const year = month.getFullYear();
  const m = month.getMonth();
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const firstWeekday = (new Date(year, m, 1).getDay() + 6) % 7; // Monday = 0

  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, m, i + 1));

  return (
    <div className="flex flex-col gap-2">
      {caption && (
        <p className="text-center text-sm font-medium text-gray-800">{caption}</p>
      )}

      <div className="grid grid-cols-7 gap-1.5">
        {weekdayLabels.map((w) => (
          <div key={w} className="py-1 text-center text-xs font-medium text-gray-400">
            {w}
          </div>
        ))}

        {Array.from({ length: firstWeekday }).map((_, i) => (
          <div key={`blank-${i}`} aria-hidden="true" />
        ))}

        {days.map((day) => {
          const slot = slotForDay(slots, day);
          const isBooked = slot?.periodType === 'booked';
          const selected = inSelection(day, selStart, selEnd);
          const isToday = ymd(day) === ymd(today);
          const editable = !isBooked;

          const classes = ['h-11 rounded-lg text-sm flex items-center justify-center transition-colors'];

          if (selected) {
            classes.push('bg-blue-50 text-blue-700 ring-2 ring-inset ring-blue-500 font-medium');
          } else if (slot) {
            classes.push(TYPE_CELL[slot.periodType]);
          } else {
            classes.push('text-gray-700 hover:bg-gray-50');
          }

          if (isToday && !selected) classes.push('ring-2 ring-inset ring-blue-400 font-semibold');
          classes.push(editable ? 'cursor-pointer' : 'cursor-default');

          return (
            <button
              key={ymd(day)}
              type="button"
              disabled={!editable}
              onClick={() => onDayClick(day)}
              aria-pressed={selected}
              className={classes.join(' ')}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SlotCalendar;
