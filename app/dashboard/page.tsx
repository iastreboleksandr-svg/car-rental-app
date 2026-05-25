'use client';

import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import { Car, Pencil, Calendar } from 'lucide-react';
import { useDashboardPage } from '@/hooks/useDashboardPage';
import { useTranslations } from 'next-intl';

const statusClass: Record<string, string> = {
  active: 'bg-green-100 text-green-600',
  rented: 'bg-orange-100 text-orange-500',
  inactive: 'bg-gray-100 text-gray-500',
};

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const { cars, isLoading, goToEdit, goToSlots, goToNewCar } = useDashboardPage();

  return (
    <div className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">{t('subtitle')}</p>
          <h1 className="text-xl font-semibold text-gray-800 mt-0.5">{t('title')}</h1>
        </div>
        <Button onClick={goToNewCar}>{t('addCar')}</Button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-400 py-8 justify-center">
          <Spinner size="sm" /> {tCommon('loading')}
        </div>
      )}

      {!isLoading && cars.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
            <Car size={32} />
          </div>
          <p className="text-sm text-gray-400">{t('noCars')}</p>
          <Button onClick={goToNewCar}>{t('addFirst')}</Button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {cars.map((car) => (
          <div key={car.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                <Car size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{car.brand} {car.model} · {car.year}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{car.address}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusClass[car.status] ?? statusClass.inactive}`}>
                    {t(`status.${car.status}`)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">${car.pricePerDay}/день</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1" leftIcon={<Pencil size={13} />} onClick={() => goToEdit(car.id)}>
                {t('actions.edit')}
              </Button>
              <Button variant="secondary" size="sm" className="flex-1" leftIcon={<Calendar size={13} />} onClick={() => goToSlots(car.id)}>
                {t('actions.availability')}
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
