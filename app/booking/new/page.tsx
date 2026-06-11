'use client';

import Link from 'next/link';
import Button from '@/components/atoms/Button';
import { DateRangePicker } from '@/components/atoms/DateRangePicker';
import { Banknote, ArrowLeft } from 'lucide-react';
import { useBookingNewPage } from '@/hooks/useBookingNewPage';
import { useTranslations } from 'next-intl';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border-default pt-5 flex flex-col gap-4">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">{title}</p>
      {children}
    </div>
  );
}

export default function BookingNewPage() {
  const t = useTranslations('bookings');
  const tCommon = useTranslations('common');
  const {
    carId, car, dateRange, setDateRange, busyRanges, availableRanges, blockedRanges,
    days, pricePerDay, deposit, rentalCost, total,
    loading, confirmed, error, handleConfirm, refetchBookedDates,
  } = useBookingNewPage();

  return (
    <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">

      {car && (
        <div className="bg-bg-card rounded-2xl shadow-sm p-5">
          <p className="text-base font-semibold text-text-base">{car.brand} {car.model}</p>
          <p className="text-sm text-text-muted">${pricePerDay} / {t('perDay')}</p>
        </div>
      )}

      <div className="bg-bg-card rounded-2xl shadow-sm p-5">
        <Section title={t('rentalDates')}>
          <DateRangePicker label={t('selectPeriod')} value={dateRange} onChange={setDateRange} busyRanges={busyRanges} blockedRanges={blockedRanges} availableRanges={availableRanges} restrictToAvailable onOpen={refetchBookedDates} />
          <div className="flex flex-wrap gap-3 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-[#fee2e2]" /> {t('legendConfirmed')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-[#fef3c7]" /> {t('legendPending')}
            </span>
          </div>
        </Section>
      </div>

      {days > 0 && (
        <div className="bg-bg-card rounded-2xl shadow-sm p-5">
          <Section title={t('priceTitle')}>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>${pricePerDay} × {t('daysSelected', { count: days })}</span>
                <span>${rentalCost}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>{t('deposit')}</span>
                <span>${deposit}</span>
              </div>
              <div className="flex justify-between border-t border-border-default pt-2 font-semibold text-text-base">
                <span>{t('total')}</span>
                <span className="text-brand">${total}</span>
              </div>
            </div>
          </Section>
        </div>
      )}

      <div className="bg-bg-card rounded-2xl shadow-sm p-5">
        <Section title={t('payment')}>
          <div className="flex items-center gap-3 border border-border-default rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-brand-subtle flex items-center justify-center shrink-0">
              <Banknote size={18} className="text-brand" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-secondary">{t('cashPayment')}</p>
              <p className="text-xs text-text-muted">{t('cashDescription')}</p>
            </div>
          </div>
        </Section>
      </div>

      {error && (
        <p className="text-sm text-text-error">
          {error instanceof Error ? error.message : tCommon('error')}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <Button className="w-full" onClick={handleConfirm} disabled={loading || confirmed || days === 0 || !carId}>
          {confirmed ? t('confirmed') : loading ? t('processing') : t('confirm')}
        </Button>
        <Link href="/search" className="flex items-center justify-center gap-1.5 text-sm text-text-muted hover:text-text-secondary transition-colors">
          <ArrowLeft size={14} />
          {t('backToSearch')}
        </Link>
      </div>

    </main>
  );
}
