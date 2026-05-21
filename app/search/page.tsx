'use client';

import { useState } from 'react';
import { Car, Calendar, MapPin, Star } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';

const mockCars = [
  { id: 1, price: 50, rating: 4, reviews: 8, status: 'active' },
  { id: 2, price: 35, rating: 5, reviews: 14, status: 'active' },
  { id: 3, price: 70, rating: 3, reviews: 3, status: 'active' },
  { id: 4, price: 45, rating: 0, reviews: 0, status: 'active' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}
        />
      ))}
    </div>
  );
}

export default function SearchPage() {
  const [startDate, setStartDate] = useState('01.06.2025');
  const [endDate, setEndDate] = useState('05.06.2025');
  const [city, setCity] = useState('Киев');
  const [maxPrice, setMaxPrice] = useState('100');
  const [fuel, setFuel] = useState<string[]>(['Бензин']);
  const [transmission, setTransmission] = useState('auto');

  const toggleFuel = (type: string) => {
    setFuel((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6 flex flex-col gap-6">

        {/* Filters + Results */}
        <div className="flex gap-6">

          {/* Left: Filters */}
          <div className="flex flex-col gap-4 w-48 flex-shrink-0">
            <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Фильтры</p>

            {/* Dates */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Дата начала</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                <Calendar size={14} className="text-gray-400" />
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-none bg-transparent w-full text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Дата окончания</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                <Calendar size={14} className="text-gray-400" />
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-none bg-transparent w-full text-sm"
                />
              </div>
            </div>

            {/* City */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Город</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                <MapPin size={14} className="text-gray-400" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="outline-none bg-transparent w-full text-sm"
                />
              </div>
            </div>

            {/* Fuel */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Тип топлива</p>
              {['Бензин', 'Дизель', 'Электро', 'Гибрид'].map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fuel.includes(type)}
                    onChange={() => toggleFuel(type)}
                    className="w-4 h-4 rounded border-gray-300 accent-blue-500"
                  />
                  {type}
                </label>
              ))}
            </div>

            {/* Transmission */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">КПП</p>
              <div className="flex items-center gap-3">
                {[{ value: 'auto', label: 'Авто' }, { value: 'manual', label: 'Механ.' }].map((t) => (
                  <label key={t.value} className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="radio"
                      name="transmission"
                      value={t.value}
                      checked={transmission === t.value}
                      onChange={() => setTransmission(t.value)}
                      className="accent-blue-500"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Max price */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Макс. цена/день</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                <span className="text-gray-400">$</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="outline-none bg-transparent w-full text-sm"
                />
              </div>
            </div>

            {/* Buttons */}
            <Button className="w-full">Найти</Button>
            <button className="text-sm text-gray-400 hover:text-gray-600 text-center">
              Сбросить фильтры
            </button>
          </div>

          {/* Right: Results */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Найдено: {mockCars.length} машин</p>
              <button className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-50">
                Сортировка ▾
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3">
              {mockCars.map((car) => (
                <div
                  key={car.id}
                  className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <Car size={32} />
                  </div>
                  <div className="h-2.5 w-3/4 bg-gray-200 rounded" />
                  <div className="h-2 w-1/2 bg-gray-100 rounded" />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-blue-500">${car.price}/д</p>
                  </div>
                  {car.reviews > 0 && (
                    <div className="flex items-center gap-1">
                      <StarRating rating={car.rating} />
                      <span className="text-xs text-gray-400">({car.reviews})</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              Загрузить ещё
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}