'use client';

import { useState } from 'react';
import { SearchFilters } from './SearchFilters';
import { SearchResults } from './SearchResults';

const mockCars = [
  { id: 1, price: 50, rating: 4, reviews: 8 },
  { id: 2, price: 35, rating: 5, reviews: 14 },
  { id: 3, price: 70, rating: 3, reviews: 3 },
  { id: 4, price: 45, rating: 0, reviews: 0 },
];

export default function SearchPage() {
  const [startDate, setStartDate] = useState('01.06.2025');
  const [endDate, setEndDate] = useState('05.06.2025');
  const [city, setCity] = useState('Киев');
  const [maxPrice, setMaxPrice] = useState('100');
  const [fuel, setFuel] = useState<string[]>(['Бензин']);
  const [transmission, setTransmission] = useState('auto');

  const toggleFuel = (type: string) => {
    setFuel((prev) => prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]);
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setCity('');
    setMaxPrice('100');
    setFuel([]);
    setTransmission('auto');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6">
        <div className="flex gap-6">
          <SearchFilters
            startDate={startDate}
            endDate={endDate}
            city={city}
            maxPrice={maxPrice}
            fuel={fuel}
            transmission={transmission}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onCityChange={setCity}
            onMaxPriceChange={setMaxPrice}
            onFuelToggle={toggleFuel}
            onTransmissionChange={setTransmission}
            onSearch={() => console.log('search')}
            onReset={handleReset}
          />
          <SearchResults cars={mockCars} />
        </div>
      </div>
    </div>
  );
}