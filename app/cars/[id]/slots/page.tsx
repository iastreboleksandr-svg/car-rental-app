'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { PrivateRoute } from '@/components/layout/PrivateRoute';
import { SlotCalendar } from '@/components/cars/slots/SlotCalendar';
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
    isTogglingAlways,
  } = useCarSlotsPage(carId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-text-muted">
        <Spinner size="sm" /> {tCommon('loading')}
      </div>
    );
  }

  const navBtn =
    'flex h-8 w-8 items-center justify-center rounded-lg border border-border-default text-text-secondary ' +
    'transition-colors hover:bg-bg-disabled active:bg-bg-disabled';

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="overflow-hidden rounded-2xl border border-border-default bg-bg-card shadow-sm">
        <div className="flex items-center gap-3 border-b border-border-default px-5 py-4">
          <Link
            href="/dashboard"
            aria-label={tCommon('back')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default text-text-muted transition-colors hover:border-text-muted hover:text-text-secondary"
          >
            <ArrowLeft size={16} />
          </Link>
          {car ? (
            <h1 className="text-base font-semibold text-text-base">
              {car.brand} {car.model}
            </h1>
          ) : (
            <div className="h-5 w-32 animate-pulse rounded bg-bg-disabled" />
          )}
        </div>

        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button type="button" className={navBtn} onClick={prevMonth} aria-label={tCommon('back')}>
                <ChevronLeft size={16} />
              </button>
              <span className="min-w-[130px] text-center text-sm font-medium text-text-base">
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
              disabled={isTogglingAlways}
            />
          </div>

          {alwaysAvailable && (
            <p className="rounded-lg bg-brand-subtle px-3 py-2 text-xs text-brand">
              {t('alwaysAvailableNote')}
            </p>
          )}

          {isError && <p className="text-sm text-text-error">{t('loadError')}</p>}

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

          <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
            <LegendItem color="bg-brand-subtle" label={t('legend.available')} />
            <LegendItem color="bg-rose-100" label={t('legend.blocked')} />
            <LegendItem color="bg-amber-100" label={t('legend.booked')} />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-default p-5">
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">{t('hint')}</p>

          {selStart && (
            <div className="flex flex-col gap-3 rounded-xl border border-border-default bg-bg-disabled p-4">
              <p className="text-sm text-text-secondary">{t('selectedPeriod', { range: selectionLabel })}</p>
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

          {activeSlot && (
            <div className="flex flex-col gap-3 rounded-xl border border-border-default bg-bg-disabled p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-secondary">{activeSlotLabel}</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    activeSlot.periodType === 'available'
                      ? 'bg-brand-subtle text-brand'
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
