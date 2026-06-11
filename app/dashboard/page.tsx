'use client';

import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import { Car } from 'lucide-react';
import { DashboardCarCard } from '@/components/dashboard/DashboardCarCard';
import { useDashboardPage } from '@/hooks/useDashboardPage';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const {
    cars, isLoading, goToEdit, goToSlots, goToNewCar,
    handleToggleStatus, isTogglingStatus, togglingId,
  } = useDashboardPage();

  return (
    <div className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-text-muted tracking-widest uppercase">{t('subtitle')}</p>
          <h1 className="text-xl font-semibold text-text-base mt-0.5">{t('title')}</h1>
        </div>
        <Button onClick={goToNewCar}>{t('addCar')}</Button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-text-muted py-8 justify-center">
          <Spinner size="sm" /> {tCommon('loading')}
        </div>
      )}

      {!isLoading && cars.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="w-16 h-16 bg-bg-page rounded-full flex items-center justify-center text-text-disabled">
            <Car size={32} />
          </div>
          <p className="text-sm text-text-muted">{t('noCars')}</p>
          <Button onClick={goToNewCar}>{t('addFirst')}</Button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {cars.map((car) => (
          <DashboardCarCard
            key={car.id}
            car={car}
            statusLabel={t(`status.${car.status}`)}
            editLabel={t('actions.edit')}
            availabilityLabel={t('actions.availability')}
            publishedLabel={t('published')}
            onEdit={goToEdit}
            onSlots={goToSlots}
            onToggleStatus={handleToggleStatus}
            toggling={isTogglingStatus && togglingId === car.id}
          />
        ))}
      </div>

    </div>
  );
}
