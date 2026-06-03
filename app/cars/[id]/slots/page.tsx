'use client';

import { use } from 'react';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { PrivateRoute } from '@/components/layout/PrivateRoute';
import { SlotCalendar } from '@/components/cars/slots/SlotCalendar';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import Toggle from '@/components/atoms/Toggle';
import RadioButton from '@/components/atoms/RadioButton';
import { useCarSlotsPage } from '@/hooks/useCarSlotsPage';
import { useTranslations } from 'next-intl';

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded ${color}`} aria-hidden="true" />
      {label}
    </span>
  );
}

function CarSlots({ carId }: { carId: string }) {
  const t = useTranslations('slots');
  const tCommon = useTranslations('common');
  const {
    car,
    slots,
    isLoading,
    isError,
    viewMonth,
    nextMonthDate,
    monthLabel,
    nextMonthLabel,
    weekdayLabels,
    today,
    prevMonth,
    nextMonth,
    selStart,
    selEnd,
    selectionLabel,
    pendingType,
    setPendingType,
    handleDayClick,
    save,
    cancel,
    isSaving,
    activeSlot,
    activeSlotLabel,
    deleteActive,
    closeDelete,
    isDeleting,
    alwaysAvailable,
    setAlwaysAvailable,
  } = useCarSlotsPage(carId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-gray-400">
        <Spinner size="sm" /> {tCommon('loading')}
      </div>
    );
  }

  const navBtn =
    'flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 ' +
    'transition-colors hover:bg-gray-50 active:bg-gray-100';

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          {car ? (
            <h1 className="text-base font-semibold text-gray-800">
              {car.brand} {car.model}
            </h1>
          ) : (
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
          )}
          <Avatar firstName={car?.brand ?? '?'} lastName={car?.model ?? ''} size="md" />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 p-5">
          {/* Control bar: month navigation + always-available toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button type="button" className={navBtn} onClick={prevMonth} aria-label={tCommon('back')}>
                <ChevronLeft size={16} />
              </button>
              <span className="min-w-[130px] text-center text-sm font-medium text-gray-800">
                {monthLabel}
              </span>
              <button type="button" className={navBtn} onClick={nextMonth} aria-label="Next">
                <ChevronRight size={16} />
              </button>
            </div>

            <Toggle
              checked={alwaysAvailable}
              onChange={setAlwaysAvailable}
              label={t('alwaysAvailable')}
              labelPosition="left"
            />
          </div>

          {alwaysAvailable && (
            <p className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
              {t('alwaysAvailableNote')}
            </p>
          )}

          {isError && <p className="text-sm text-red-500">{t('loadError')}</p>}

          {/* Calendars: 1 month on mobile, 2 on desktop */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SlotCalendar
              month={viewMonth}
              slots={slots}
              selStart={selStart}
              selEnd={selEnd}
              today={today}
              weekdayLabels={weekdayLabels}
              onDayClick={handleDayClick}
            />
            <div className="hidden lg:block">
              <SlotCalendar
                month={nextMonthDate}
                slots={slots}
                selStart={selStart}
                selEnd={selEnd}
                today={today}
                weekdayLabels={weekdayLabels}
                caption={nextMonthLabel}
                onDayClick={handleDayClick}
              />
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <LegendItem color="bg-green-100" label={t('legend.available')} />
            <LegendItem color="bg-rose-100" label={t('legend.blocked')} />
            <LegendItem color="bg-blue-100" label={t('legend.booked')} />
          </div>
        </div>

        {/* Footer: hint + selection / delete panel */}
        <div className="flex flex-col gap-3 border-t border-gray-100 p-5">
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">{t('hint')}</p>

          {/* Create panel */}
          {selStart && (
            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm text-gray-700">{t('selectedPeriod', { range: selectionLabel })}</p>
              <div className="flex gap-6">
                <RadioButton
                  name="slot-type"
                  value="available"
                  checked={pendingType === 'available'}
                  onChange={() => setPendingType('available')}
                  label={t('markAvailable')}
                />
                <RadioButton
                  name="slot-type"
                  value="blocked"
                  checked={pendingType === 'blocked'}
                  onChange={() => setPendingType('blocked')}
                  label={t('markBlocked')}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={save} loading={isSaving}>
                  {t('save')}
                </Button>
                <Button variant="secondary" onClick={cancel}>
                  {t('cancel')}
                </Button>
              </div>
            </div>
          )}

          {/* Delete panel */}
          {activeSlot && (
            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">{activeSlotLabel}</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    activeSlot.periodType === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-rose-100 text-rose-600'
                  }`}
                >
                  {t(`legend.${activeSlot.periodType}`)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="danger"
                  onClick={deleteActive}
                  loading={isDeleting}
                  leftIcon={<Trash2 size={14} />}
                >
                  {t('deletePeriod')}
                </Button>
                <Button variant="secondary" onClick={closeDelete}>
                  {t('cancel')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CarSlotsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <PrivateRoute>
      <CarSlots carId={id} />
    </PrivateRoute>
  );
}
