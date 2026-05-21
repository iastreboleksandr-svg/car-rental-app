'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import { Calendar, Banknote, ArrowLeft } from 'lucide-react';

// ─── Mock Data (В реальном проекте его нужно заменить на fetch из API)────────────────────────────────────────────────────────────────
const CAR = {
  id: '1',
  name: 'Mercedes-Benz S-Class',
  pricePerDay: 50,
  deposit: 200,
};

function formatDate(date) {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function diffDays(from, to) {
  return Math.max(0, Math.round((to - from) / (1000 * 60 * 60 * 24)));
}

// ─── Date Input ───────────────────────────────────────────────────────────────
function DateInput({ label, value, onChange, min }) {
  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="relative">
        <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
        />
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="border-t border-gray-100 pt-5 flex flex-col gap-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</p>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BookingCheckoutPage() {
  const today = new Date().toISOString().split('T')[0];
  const defaultEnd = new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState('2025-06-01');
  const [endDate, setEndDate] = useState('2025-06-05');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const days = diffDays(new Date(startDate), new Date(endDate));
  const rentalCost = days * CAR.pricePerDay;
  const total = rentalCost + CAR.deposit;

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center">
            АП
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">
        {/* ── Car ── */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <Section title="Машина">
            <div className="flex items-center gap-4">
              {/* Car thumb */}
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
                  ${CAR.pricePerDay}{' '}
                  <span className="text-sm font-normal text-gray-400">/ день</span>
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* ── Dates ── */}
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
              <DateInput
                label="Конец"
                value={endDate}
                min={startDate}
                onChange={setEndDate}
              />
            </div>
          </Section>
        </div>

        {/* ── Cost ── */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <Section title="Расчёт стоимости">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  {days} {days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'} × ${CAR.pricePerDay}
                </span>
                <span>${rentalCost}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Депозит</span>
                <span>${CAR.deposit}</span>
              </div>
              <div className="border-t border-gray-100 mt-1 pt-3 flex justify-between items-center">
                <span className="text-base font-semibold text-gray-800">Итого</span>
                <span className="text-base font-semibold text-blue-500">${total}</span>
              </div>
            </div>
          </Section>
        </div>

        {/* ── Payment ── */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <Section title="Способ оплаты">
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-4">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <Banknote size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Наличными при получении</p>
                <p className="text-xs text-gray-400">Оплата напрямую владельцу</p>
              </div>
            </div>
          </Section>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col gap-3">
          <Button
            className="w-full"
            onClick={handleConfirm}
            disabled={loading || confirmed || days === 0}
          >
            {confirmed ? '✓ Бронирование подтверждено' : loading ? 'Обработка...' : 'Подтвердить бронирование'}
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
    </div>
  );
}





// import { PrivateRoute } from '@/components/layout/PrivateRoute';

// export default function MyBookingsPage() {
//   return (
//     <PrivateRoute>
//       <div>MyBookingsPage</div>
//     </PrivateRoute>
//   );
// }
