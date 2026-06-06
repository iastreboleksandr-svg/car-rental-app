'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Car, ChevronRight } from 'lucide-react';
import Button from '@/components/atoms/Button';
import Link from 'next/link';

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

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const carId = searchParams.get('carId') ?? '1';
  const from = searchParams.get('from') ?? '';
  const to = searchParams.get('to') ?? '';

  const days = calcDays(from, to);
  const total = days * MOCK_CAR.pricePerDay + MOCK_CAR.deposit;

  return (
    <div className="min-h-screen bg-bg-page py-8 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">

        {/* Успех */}
        <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-8 flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-subtle flex items-center justify-center">
            <CheckCircle size={32} className="text-brand" />
          </div>
          <h1 className="text-xl font-semibold text-text-base">Заявка отправлена!</h1>
          <p className="text-sm text-text-muted">
            Владелец получит уведомление и подтвердит бронь в течение часа.
          </p>
        </div>

        {/* Детали брони */}
        <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-5 flex flex-col gap-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Детали брони</p>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-bg-disabled flex items-center justify-center shrink-0">
              <Car size={20} className="text-text-muted" />
            </div>
            <p className="font-semibold text-text-base">{MOCK_CAR.name}</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Период</span>
              <span className="text-text-base font-medium">
                {formatDate(from)} – {formatDate(to)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Итого</span>
              <span className="text-text-base font-medium">${total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Статус</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-bg-warning text-status-warning">
                Ожидает
              </span>
            </div>
          </div>
        </div>

        {/* Контакт владельца */}
        <div className="bg-bg-disabled rounded-2xl border border-border-default p-4 flex flex-col gap-1">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-1">Контакт владельца</p>
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-sm">🔒</span>
            <p className="text-sm text-text-muted">Будет доступен после подтверждения</p>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex flex-col gap-3">
          <Button className="w-full" onClick={() => router.push('/bookings')}>
            Мои брони
          </Button>
          <button
            onClick={() => router.push(`/cars/${carId}`)}
            className="w-full py-3 text-sm text-text-error hover:text-text-base transition-colors"
          >
            Отменить заявку
          </button>
        </div>

      </div>
    </div>
  );
}