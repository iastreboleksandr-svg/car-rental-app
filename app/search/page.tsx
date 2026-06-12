'use client';

import { useState } from 'react';
import Spinner from '@/components/atoms/Spinner';
import Button from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { RadioButton } from '@/components/atoms/RadioButton';
import Input from '@/components/atoms/Input';
import { DateRangePicker } from '@/components/atoms/DateRangePicker';
import { LocationPicker } from '@/components/atoms/map/LocationPicker';
import { CarCard } from '@/components/search/CarCard';
import { useSearchPage } from '@/hooks/useSearchPage';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal, X } from 'lucide-react';

export default function SearchPage() {
  const t = useTranslations('search');
  const tCommon = useTranslations('common');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const {
    dateRange, setDateRange,
    fuel, toggleFuel,
    transmission, setTransmission,
    maxPrice, setMaxPrice,
    point, setPoint,
    radius, setRadius,
    applyFilters, resetFilters,
    cars, total, isLoading, isError,
    hasNextPage, isFetchingNextPage, loadMore,
  } = useSearchPage();

  const FUEL_OPTIONS = [
    { value: 'petrol', label: t('fuel.petrol') },
    { value: 'diesel', label: t('fuel.diesel') },
    { value: 'electric', label: t('fuel.electric') },
    { value: 'hybrid', label: t('fuel.hybrid') },
  ];

  const handleApply = () => {
    applyFilters();
    setFiltersOpen(false);
  };

  const handleReset = () => {
    resetFilters();
    setFiltersOpen(false);
  };

  const filtersPanel = (
    <>
        <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">{t('filters')}</p>

        <DateRangePicker label={t('rentalDates')} value={dateRange} onChange={setDateRange} />

        <div className="flex flex-col gap-2">
          <LocationPicker
            label={t('location')}
            hint={t('locationHint')}
            lat={point?.lat ?? 0}
            lng={point?.lng ?? 0}
            onChange={(lat, lng) => setPoint({ lat, lng })}
          />
          {point && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-text-secondary">
                {t('radius', { km: radius })}
              </label>
              <input
                type="range"
                min={1}
                max={200}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-brand"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">{t('fuelType')}</p>
          {FUEL_OPTIONS.map((o) => (
            <Checkbox
              key={o.value}
              label={o.label}
              checked={fuel.includes(o.value)}
              onChange={() => toggleFuel(o.value)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">{t('transmission')}</p>
          <RadioButton label={t('gearbox.automatic')} value="automatic" name="transmission" checked={transmission === 'automatic'} onChange={setTransmission} />
          <RadioButton label={t('gearbox.manual')} value="manual" name="transmission" checked={transmission === 'manual'} onChange={setTransmission} />
        </div>

        <Input label={t('maxPrice')} type="number" placeholder="—" value={maxPrice} onChange={setMaxPrice} />

        <Button className="w-full" onClick={handleApply}>{t('find')}</Button>
        <Button variant="ghost" size="sm" className="w-full text-gray-400" onClick={handleReset}>{t('resetFilters')}</Button>
    </>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6">
      <div className="hidden md:flex flex-col gap-4 w-64 shrink-0">
        {filtersPanel}
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {!isLoading && !isError && (
          <div className="flex items-center justify-between md:hidden">
            <p className="text-sm text-gray-600">{t('found', { count: total })}</p>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={filtersOpen ? <X size={16} /> : <SlidersHorizontal size={16} />}
              onClick={() => setFiltersOpen((v) => !v)}
            >
              {filtersOpen ? t('hideFilters') : t('filters')}
            </Button>
          </div>
        )}

        {filtersOpen && (
          <div className="flex flex-col gap-4 md:hidden border border-border-default rounded-2xl p-4 bg-bg-card">
            {filtersPanel}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 pt-8 text-sm text-gray-400">
            <Spinner size="sm" /> {tCommon('loading')}
          </div>
        )}

        {isError && (
          <p className="text-sm text-red-500 text-center pt-8">{t('loadError')}</p>
        )}

        {!isLoading && !isError && (
          <>
            <p className="hidden md:block text-sm text-gray-600">{t('found', { count: total })}</p>

            {cars.length === 0 && (
              <p className="text-sm text-gray-400 text-center pt-8">{t('nothingFound')}</p>
            )}

            <div className="grid grid-cols-2 gap-3">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} noReviewsLabel={t('noReviews')} perDayLabel={t('perDayShort')} />
              ))}
            </div>

            {hasNextPage && (
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => loadMore()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? tCommon('loading') : t('loadMore')}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
