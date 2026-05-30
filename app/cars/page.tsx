'use client';

import { useState } from 'react';
import { SearchResults } from '@/components/search/SearchResults';

// Моковые данные — в реальности придут с API
const MOCK_CARS = [
  { id: 1, price: 50, rating: 4, reviews: 8 },
  { id: 2, price: 35, rating: 5, reviews: 14 },
  { id: 3, price: 70, rating: 3, reviews: 3 },
  { id: 4, price: 45, rating: 4, reviews: 0 },
  { id: 5, price: 60, rating: 5, reviews: 21 },
  { id: 6, price: 30, rating: 4, reviews: 6 },
];

type SortKey = 'default' | 'price_asc' | 'price_desc' | 'rating';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'default', label: 'По умолчанию' },
  { key: 'price_asc', label: 'Цена ↑' },
  { key: 'price_desc', label: 'Цена ↓' },
  { key: 'rating', label: 'Рейтинг' },
];

export default function CarsPage() {
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Сортируем копию массива — оригинал не трогаем
  const sorted = [...MOCK_CARS].sort((a, b) => {
    if (sortKey === 'price_asc') return a.price - b.price;
    if (sortKey === 'price_desc') return b.price - a.price;
    if (sortKey === 'rating') return b.rating - a.rating;
    return 0; // default — без сортировки
  });

  const activeSortLabel = SORT_OPTIONS.find((o) => o.key === sortKey)?.label;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Заголовок + сортировка */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Все автомобили</h1>

          {/* Дропдаун сортировки */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu((v) => !v)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors bg-white"
            >
              {activeSortLabel} ▾
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden min-w-36">
                {SORT_OPTIONS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSortKey(key);
                      setShowSortMenu(false);
                    }}
                    className={`
                      w-full text-left px-4 py-2.5 text-sm transition-colors
                      ${sortKey === key
                        ? 'bg-[#48C964]/10 text-[#2a9043] font-medium'
                        : 'text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Список машин */}
        <SearchResults cars={sorted} />

      </div>
    </div>
  );
}