'use client';

import { useState } from 'react';
import { SearchResults } from '@/components/search/SearchResults';

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

  const sorted = [...MOCK_CARS].sort((a, b) => {
    if (sortKey === 'price_asc') return a.price - b.price;
    if (sortKey === 'price_desc') return b.price - a.price;
    if (sortKey === 'rating') return b.rating - a.rating;
    return 0;
  });

  const activeSortLabel = SORT_OPTIONS.find((o) => o.key === sortKey)?.label;

  return (
    <div className="min-h-screen bg-bg-page py-8 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-text-base">Все автомобили</h1>

          <div className="relative">
            <button
              onClick={() => setShowSortMenu((v) => !v)}
              className="text-sm border border-border-default rounded-lg px-3 py-1.5 text-text-secondary hover:bg-bg-page transition-colors bg-bg-card"
            >
              {activeSortLabel} ▾
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-full mt-1 bg-bg-card border border-border-default rounded-xl shadow-lg z-10 overflow-hidden min-w-36">
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
                        ? 'bg-brand-subtle text-brand font-medium'
                        : 'text-text-secondary hover:bg-bg-page'}
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <SearchResults cars={sorted} />

      </div>
    </div>
  );
}