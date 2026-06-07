'use client';

import Link from 'next/link';
import Button from '@/components/atoms/Button';
import { Calendar, Banknote, ArrowLeft } from 'lucide-react';
import { useBookingNewPage } from '@/hooks/useBookingNewPage';
import { useTranslations } from 'next-intl';

function DateInput({ label, value, onChange, min }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min: string;
}) {
  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <label className="text-sm text-text-secondary">{label}</label>
      <div className="relative">
        <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border-default bg-bg-card pl-9 pr-3 py-2.5 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-border-focus transition-colors"
        />
      </div>
    </div>
  );
}

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
  const { today, startDate, endDate, days, loading, confirmed, handleStartDateChange, setEndDate, handleConfirm } = useBookingNewPage();

  return (
    <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">

      <div className="bg-bg-card rounded-2xl shadow-sm p-5">
        <Section title={t('rentalDates')}>
          <div className="flex gap-3">
            <DateInput label={t('startDate')} value={startDate} min={today} onChange={handleStartDateChange} />
            <DateInput label={t('endDate')} value={endDate} min={startDate} onChange={setEndDate} />
          </div>
        </Section>
      </div>

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

      <div className="flex flex-col gap-3">
        <Button className="w-full" onClick={handleConfirm} disabled={loading || confirmed || days === 0}>
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
