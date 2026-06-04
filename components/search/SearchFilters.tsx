'use client';

import { Calendar, MapPin } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface SearchFiltersProps {
  startDate: string;
  endDate: string;
  city: string;
  maxPrice: string;
  fuel: string[];
  transmission: string;
  onStartDateChange: (v: string) => void;
  onEndDateChange: (v: string) => void;
  onCityChange: (v: string) => void;
  onMaxPriceChange: (v: string) => void;
  onFuelToggle: (v: string) => void;
  onTransmissionChange: (v: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

export function SearchFilters({
  startDate,
  endDate,
  city,
  maxPrice,
  fuel,
  transmission,
  onStartDateChange,
  onEndDateChange,
  onCityChange,
  onMaxPriceChange,
  onFuelToggle,
  onTransmissionChange,
  onSearch,
  onReset,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col gap-4 w-48 shrink-0">
      <p className="text-xs font-bold text-brand tracking-widest uppercase bg-brand-subtle border border-brand-subtle self-start px-3 py-1 rounded-full">
        Фильтры
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-text-muted">Дата начала</label>
        <div className="flex items-center gap-2 border border-border-default rounded-lg px-3 py-2">
          <Calendar size={14} className="text-text-muted" />
          <input
            type="text"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="outline-none bg-transparent w-full text-sm text-text-base"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-text-muted">Дата окончания</label>
        <div className="flex items-center gap-2 border border-border-default rounded-lg px-3 py-2">
          <Calendar size={14} className="text-text-muted" />
          <input
            type="text"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="outline-none bg-transparent w-full text-sm text-text-base"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-text-muted">Город</label>
        <div className="flex items-center gap-2 border border-border-default rounded-lg px-3 py-2">
          <MapPin size={14} className="text-text-muted" />
          <input
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="outline-none bg-transparent w-full text-sm text-text-base"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-text-muted tracking-widest uppercase">Тип топлива</p>
        {['Бензин', 'Дизель', 'Электро', 'Гибрид'].map((type) => (
          <label key={type} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={fuel.includes(type)}
              onChange={() => onFuelToggle(type)}
              className="w-4 h-4 rounded border-border-default accent-brand"
            />
            {type}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-text-muted tracking-widest uppercase">КПП</p>
        <div className="flex items-center gap-3">
          {[
            { value: 'auto', label: 'Авто' },
            { value: 'manual', label: 'Механ.' },
          ].map((t) => (
            <label key={t.value} className="flex items-center gap-1.5 text-sm text-text-secondary cursor-pointer">
              <input
                type="radio"
                name="transmission"
                value={t.value}
                checked={transmission === t.value}
                onChange={() => onTransmissionChange(t.value)}
                className="accent-brand"
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-text-muted">Макс. цена/день</label>
        <div className="flex items-center gap-2 border border-border-default rounded-lg px-3 py-2">
          <span className="text-text-muted">$</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="outline-none bg-transparent w-full text-sm text-text-base"
          />
        </div>
      </div>

      <Button variant="green" className="w-full" onClick={onSearch}>
        Найти
      </Button>
      <button
        onClick={onReset}
        className="text-sm text-text-muted hover:text-text-secondary transition-colors text-center"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}