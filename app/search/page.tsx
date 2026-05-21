'use client';

import { useState } from 'react';
import { Car, ChevronDown } from 'lucide-react';
import Spinner from '@/components/atoms/Spinner';
import Button from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { RadioButton } from '@/components/atoms/RadioButton';
import Input from '@/components/atoms/Input';
import StarRating from '@/components/atoms/StarRating';
import { useSearchPage } from '@/hooks/useSearchPage';
import { DayPicker } from 'react-day-picker';
import { ru } from 'react-day-picker/locale';
import Link from 'next/link';

const FUEL_OPTIONS = [
  { value: 'petrol', label: 'Бензин' },
  { value: 'diesel', label: 'Дизель' },
  { value: 'electric', label: 'Электро' },
  { value: 'hybrid', label: 'Гибрид' },
];

function formatDate(date: Date) {
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function SearchPage() {
  const {
    dateRange, setDateRange,
    fuel, toggleFuel,
    transmission, setTransmission,
    maxPrice, setMaxPrice,
    applyFilters,
    resetFilters,
    cars,
    isLoading,
    isError,
  } = useSearchPage();

  const [calendarOpen, setCalendarOpen] = useState(false);

  const dateLabel = dateRange?.from
    ? dateRange.to
      ? `${formatDate(dateRange.from)} — ${formatDate(dateRange.to)}`
      : formatDate(dateRange.from)
    : '';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6 flex flex-col gap-6">
        <div className="flex gap-6">

          {/* Left: Filters */}
          <div className="flex flex-col gap-4 w-48 shrink-0">
            <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Фильтры</p>

            {/* Date picker */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-xs font-medium text-gray-700">Даты аренды</label>
              <button
                type="button"
                onClick={() => setCalendarOpen((v) => !v)}
                className="flex items-center justify-between w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
              >
                <span className={dateLabel ? 'text-gray-900' : 'text-gray-400'}>
                  {dateLabel || 'Выберите даты'}
                </span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${calendarOpen ? 'rotate-180' : ''}`} />
              </button>

              {calendarOpen && (
                <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-2xl shadow-lg p-3">
                  <DayPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range);
                      if (range?.from && range?.to) setCalendarOpen(false);
                    }}
                    locale={ru}
                    disabled={{ before: new Date() }}
                    classNames={{
                      today: 'font-semibold text-blue-500',
                      range_start: '!bg-blue-500 !text-white rounded-l-lg',
                      range_end: '!bg-blue-500 !text-white rounded-r-lg',
                      range_middle: '!bg-blue-50 !text-blue-700',
                      selected: '!bg-blue-500 !text-white',
                    }}
                  />
                  {dateRange?.from && (
                    <button
                      onClick={() => { setDateRange(undefined); setCalendarOpen(false); }}
                      className="w-full text-xs text-gray-400 hover:text-gray-600 mt-1 py-1"
                    >
                      Сбросить даты
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Fuel checkboxes */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Тип топлива</p>
              {FUEL_OPTIONS.map((o) => (
                <Checkbox
                  key={o.value}
                  label={o.label}
                  checked={fuel.includes(o.value)}
                  onChange={() => toggleFuel(o.value)}
                />
              ))}
            </div>

            {/* Transmission radio */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">КПП</p>
              <RadioButton
                label="Авто"
                value="automatic"
                name="transmission"
                checked={transmission === 'automatic'}
                onChange={setTransmission}
              />
              <RadioButton
                label="Механ."
                value="manual"
                name="transmission"
                checked={transmission === 'manual'}
                onChange={setTransmission}
              />
            </div>

            {/* Max price */}
            <Input
              label="Макс. цена/день"
              type="number"
              placeholder="любая"
              value={maxPrice}
              onChange={setMaxPrice}
            />

            <Button className="w-full" onClick={applyFilters}>Найти</Button>
            <button onClick={resetFilters} className="text-sm text-gray-400 hover:text-gray-600 text-center">
              Сбросить фильтры
            </button>
          </div>

          {/* Right: Results */}
          <div className="flex flex-col gap-4 flex-1">
            {isLoading && (
              <div className="flex items-center justify-center gap-2 pt-8 text-sm text-gray-400">
                <Spinner size="sm" /> Загрузка...
              </div>
            )}

            {isError && (
              <p className="text-sm text-red-500 text-center pt-8">Не удалось загрузить машины</p>
            )}

            {!isLoading && !isError && (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Найдено: {cars.length} машин</p>
                </div>

                {cars.length === 0 && (
                  <p className="text-sm text-gray-400 text-center pt-8">Ничего не найдено</p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {cars.map((car) => (
                    <Link
                      key={car.id}
                      href={`/cars/${car.id}`}
                      className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 hover:shadow-md transition-shadow"
                    >
                      <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        <Car size={32} />
                      </div>
                      <p className="text-sm font-medium text-gray-800 truncate">{car.brand} {car.model}</p>
                      <p className="text-xs text-gray-400 truncate">{car.year} · {car.address}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-blue-500">${car.pricePerDay}/д</p>
                        {car.averageRating ? (
                          <StarRating value={car.averageRating} size="sm" />
                        ) : (
                          <span className="text-xs text-gray-300">нет отзывов</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
