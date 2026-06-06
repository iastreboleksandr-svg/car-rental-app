'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Car, CalendarDays } from 'lucide-react';
import Button from '@/components/atoms/Button';

const MOCK_CAR = {
  id: '1',
  name: 'Mercedes-Benz S-Class',
  pricePerDay: 50,
  deposit: 200,
};

function calcDays(from: string, to: string): number {
  if (!from || !to) return 0;
  const diff = new Date(to).getTime() - new Date(from).getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function BookingNewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const carId = searchParams.get('carId') ?? '1';

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [error, setError] = useState('');

  const days = calcDays(dateFrom, dateTo);
  const total = days * MOCK_CAR.pricePerDay + MOCK_CAR.deposit;
  const canSubmit = days > 0;

  const handleSubmit = () => {
    if (!dateFrom || !dateTo) {
      setError('Выберите даты аренды');
      return;
    }
    if (days <= 0) {
      setError('Дата окончания должна быть позже даты начала');
      return;
    }
    setError('');
    router.push(`/booking/confirmation?carId=${carId}&from=${dateFrom}&to=${dateTo}`);
  };

  return (
    <div className="min-h-screen bg-bg-page py-8 px-4">
      <div className="max-w-lg mx-auto">

        <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default overflow-hidden">

          {/* Машина */}
          <div className="p-5 flex items-center gap-4 border-b border-border-default">
            <div className="w-12 h-12 rounded-xl bg-bg-disabled flex items-center justify-center shrink-0">
              <Car size={22} className="text-text-muted" />
            </div>
            <div>
              <p className="font-semibold text-text-base">{MOCK_CAR.name}</p>
              <p className="text-sm text-brand font-medium">${MOCK_CAR.pricePerDay} / день</p>
            </div>
          </div>

          {/* Даты */}
          <div className="p-5 flex flex-col gap-4 border-b border-border-default">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Даты аренды</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-base">Начало</label>
                <div className="flex items-center gap-2 border border-border-default rounded-xl px-3 py-2">
                  <CalendarDays size={16} className="text-text-muted shrink-0" />
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="text-sm text-text-base bg-transparent outline-none w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-text-base">Конец</label>
                <div className="flex items-center gap-2 border border-border-default rounded-xl px-3 py-2">
                  <CalendarDays size={16} className="text-text-muted shrink-0" />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="text-sm text-text-base bg-transparent outline-none w-full"
                  />
                </div>
              </div>
            </div>
            {error && <p className="text-sm text-text-error">{error}</p>}
          </div>

          {/* Расчёт */}
          <div className="p-5 flex flex-col gap-3 border-b border-border-default">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Расчёт стоимости</p>
            <div className="flex justify-between text-sm text-text-secondary">
              <span>{days > 0 ? `${days} дн.` : '—'} × ${MOCK_CAR.pricePerDay}</span>
              <span>{days > 0 ? `$${days * MOCK_CAR.pricePerDay}` : '—'}</span>
            </div>
            <div className="flex justify-between text-sm text-text-secondary">
              <span>Депозит</span>
              <span>${MOCK_CAR.deposit}</span>
            </div>
            <div className="flex justify-between font-bold text-text-base border-t border-border-default pt-3">
              <span>Итого</span>
              <span className="text-text-base">{days > 0 ? `$${total}` : '—'}</span>
            </div>
          </div>

          {/* Способ оплаты */}
          <div className="p-5 flex items-center gap-3 border-b border-border-default">
            <div className="w-10 h-10 rounded-xl bg-bg-disabled flex items-center justify-center shrink-0">
              <span className="text-lg">💵</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-base">Наличными при получении</p>
              <p className="text-xs text-text-muted">Оплата напрямую владельцу</p>
            </div>
          </div>

          {/* Кнопки */}
          <div className="p-5 flex flex-col gap-3">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={false}
            >
              Подтвердить бронирование
            </Button>
            <button
              onClick={() => router.push(`/cars/${carId}`)}
              className="text-sm text-text-muted hover:text-text-base transition-colors text-center"
            >
              ← Назад к машине
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}