'use client';

import { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Button from '@/components/atoms/Button';
import { ru } from 'date-fns/locale';

// ─── Типы ────────────────────────────────────────────────────────────────────

type SlotMode = 'available' | 'blocked';

// ─── Моковые данные ───────────────────────────────────────────────────────────

// Даты которые уже забронированы — их нельзя редактировать
const BOOKED_DATES = [
  new Date(2026, 5, 1),  // 1 июня
  new Date(2026, 5, 2),
  new Date(2026, 5, 3),
  new Date(2026, 5, 4),
  new Date(2026, 5, 5),
  new Date(2026, 5, 10), // 10 июня
  new Date(2026, 5, 11),
  new Date(2026, 5, 12),
];

// ─── Компонент страницы ───────────────────────────────────────────────────────

export default function CarSlotsPage() {
  // Выбранный диапазон дат
  const [range, setRange] = useState<DateRange | undefined>();

  // Режим: доступна или заблокирована
  const [mode, setMode] = useState<SlotMode>('blocked');

  // Тоггл "Всегда доступна"
  const [alwaysAvailable, setAlwaysAvailable] = useState(false);

  // Заблокированные владельцем даты
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);

  // Применить выбранный диапазон
  const handleApply = () => {
    if (!range?.from || !range?.to) return;

    // Генерируем все даты в диапазоне
    const dates: Date[] = [];
    const current = new Date(range.from);
    while (current <= range.to) {
      // Не трогаем забронированные даты
      const isBooked = BOOKED_DATES.some(
        (d) => d.toDateString() === current.toDateString()
      );
      if (!isBooked) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }

    if (mode === 'blocked') {
      // Добавляем даты в заблокированные (без дублей)
      setBlockedDates((prev) => {
        const existing = new Set(prev.map((d) => d.toDateString()));
        const newDates = dates.filter((d) => !existing.has(d.toDateString()));
        return [...prev, ...newDates];
      });
    } else {
      // Убираем даты из заблокированных
      setBlockedDates((prev) =>
        prev.filter(
          (d) => !dates.some((nd) => nd.toDateString() === d.toDateString())
        )
      );
    }

    setRange(undefined); // сбрасываем выбор
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">

        {/* Заголовок */}
        <h1 className="text-xl font-semibold text-gray-900">Доступность автомобиля</h1>

        {/* Тоггл "Всегда доступна" */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Всегда доступна</p>
            <p className="text-xs text-gray-400 mt-0.5">Машина доступна по умолчанию если не заблокирована</p>
          </div>
          {/* Тоггл — это checkbox стилизованный под switch */}
          <button
            onClick={() => setAlwaysAvailable((v) => !v)}
            className={`
              relative w-11 h-6 rounded-full transition-colors duration-200
              ${alwaysAvailable ? 'bg-[#48C964]' : 'bg-gray-200'}
            `}
          >
            <span className={`
              absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
              ${alwaysAvailable ? 'translate-x-5' : 'translate-x-0'}
            `} />
          </button>
        </div>

        {/* Календарь */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Выберите диапазон дат
          </p>

          {/* Легенда */}
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-orange-400" />
              <span className="text-xs text-gray-500">Забронировано</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-300" />
              <span className="text-xs text-gray-500">Заблокировано вами</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#48C964]" />
              <span className="text-xs text-gray-500">Выбрано</span>
            </div>
          </div>

          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            locale={ru}
            // Нельзя выбирать прошедшие даты
            disabled={{ before: new Date() }}
            // Модификаторы для кастомных стилей
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
              table: { width: '100%' },
            }}
          />

          {/* Кастомные стили для модификаторов */}
          <style>{`
            .rdp-day_booked button {
              background-color: #fb923c !important;
              color: white !important;
              border-radius: 50% !important;
            }
            .rdp-day_blocked button {
              background-color: #fca5a5 !important;
              color: white !important;
              border-radius: 50% !important;
            }
          `}</style>
        </div>

        {/* Переключатель режима */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Действие для выбранных дат
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('available')}
              className={`
                flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors border
                ${mode === 'available'
                  ? 'bg-[#48C964]/10 text-[#2a9043] border-[#48C964]/30'
                  : 'text-gray-500 border-gray-200 hover:bg-gray-50'}
              `}
            >
              ✓ Доступна
            </button>
            <button
              onClick={() => setMode('blocked')}
              className={`
                flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors border
                ${mode === 'blocked'
                  ? 'bg-red-50 text-red-500 border-red-200'
                  : 'text-gray-500 border-gray-200 hover:bg-gray-50'}
              `}
            >
              ✕ Заблокировать
            </button>
          </div>
        </div>

        {/* Кнопка применить */}
        <Button
          className="w-full"
          disabled={!range?.from || !range?.to}
          onClick={handleApply}
        >
          Применить
        </Button>

      </div>
    </div>
  );
}
