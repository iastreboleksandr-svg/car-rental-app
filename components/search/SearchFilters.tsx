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
  startDate, endDate, city, maxPrice, fuel, transmission,
  onStartDateChange, onEndDateChange, onCityChange, onMaxPriceChange,
  onFuelToggle, onTransmissionChange, onSearch, onReset,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col gap-4 w-48 flex-shrink-0">
      <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Фильтры</p>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Дата начала</label>
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
          <Calendar size={14} className="text-gray-400" />
          <input type="text" value={startDate} onChange={(e) => onStartDateChange(e.target.value)} className="outline-none bg-transparent w-full text-sm" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Дата окончания</label>
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
          <Calendar size={14} className="text-gray-400" />
          <input type="text" value={endDate} onChange={(e) => onEndDateChange(e.target.value)} className="outline-none bg-transparent w-full text-sm" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Город</label>
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
          <MapPin size={14} className="text-gray-400" />
          <input type="text" value={city} onChange={(e) => onCityChange(e.target.value)} className="outline-none bg-transparent w-full text-sm" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Тип топлива</p>
        {['Бензин', 'Дизель', 'Электро', 'Гибрид'].map((type) => (
          <label key={type} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" checked={fuel.includes(type)} onChange={() => onFuelToggle(type)} className="w-4 h-4 rounded border-gray-300 accent-blue-500" />
            {type}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">КПП</p>
        <div className="flex items-center gap-3">
          {[{ value: 'auto', label: 'Авто' }, { value: 'manual', label: 'Механ.' }].map((t) => (
            <label key={t.value} className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
              <input type="radio" name="transmission" value={t.value} checked={transmission === t.value} onChange={() => onTransmissionChange(t.value)} className="accent-blue-500" />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Макс. цена/день</label>
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
          <span className="text-gray-400">$</span>
          <input type="number" value={maxPrice} onChange={(e) => onMaxPriceChange(e.target.value)} className="outline-none bg-transparent w-full text-sm" />
        </div>
      </div>

      <Button className="w-full" onClick={onSearch}>Найти</Button>
      <button onClick={onReset} className="text-sm text-gray-400 hover:text-gray-600 text-center">Сбросить фильтры</button>
    </div>
  );
}