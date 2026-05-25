'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import { ArrowLeft } from 'lucide-react';
import { DateInput } from './DateInput';
import { CostSummary } from './CostSummary';
import { PaymentMethod } from './PaymentMethod';
import { Section } from '@/components/common/Section';

const CAR = {
  id: '1',
  name: 'Mercedes-Benz S-Class',
  pricePerDay: 50,
  deposit: 200,
};

function diffDays(from: Date, to: Date): number {
  return Math.max(0, Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
}

export function BookingCheckout() {
  const today = new Date().toISOString().split('T')[0];

  const [startDate, setStartDate] = useState('2025-06-01');
  const [endDate, setEndDate] = useState('2025-06-05');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const days = diffDays(new Date(startDate), new Date(endDate));

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 900);
  };

  return (
    <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <Section title="Машина">
          <div className="flex items-center gap-4">
            <div className="w-16 h-14 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <path
                  d="M5 11l1.5-4.5h11L19 11M3 11h18v7H3v-7zm2 7v2h2v-2H5zm12 0v2h2v-2h-2zM5.5 15a1 1 0 100-2 1 1 0 000 2zm13 0a1 1 0 100-2 1 1 0 000 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="w-24 h-3 bg-gray-200 rounded mb-2" />
              <p className="text-base font-semibold text-blue-500">
                ${CAR.pricePerDay} <span className="text-sm font-normal text-gray-400">/ день</span>
              </p>
            </div>
          </div>
        </Section>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <Section title="Даты аренды">
          <div className="flex gap-3">
            <DateInput
              label="Начало"
              value={startDate}
              min={today}
              onChange={(v) => {
                setStartDate(v);
                if (v >= endDate) setEndDate(v);
              }}
            />
            <DateInput label="Конец" value={endDate} min={startDate} onChange={setEndDate} />
          </div>
        </Section>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <Section title="Расчёт стоимости">
          <CostSummary days={days} pricePerDay={CAR.pricePerDay} deposit={CAR.deposit} />
        </Section>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <Section title="Способ оплаты">
          <PaymentMethod />
        </Section>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          className="w-full"
          onClick={handleConfirm}
          disabled={loading || confirmed || days === 0}
        >
          {confirmed
            ? '✓ Бронирование подтверждено'
            : loading
              ? 'Обработка...'
              : 'Подтвердить бронирование'}
        </Button>
        <Link
          href={`/cars/${CAR.id}`}
          className="flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft size={14} />
          Назад к машине
        </Link>
      </div>
    </main>
  );
}
