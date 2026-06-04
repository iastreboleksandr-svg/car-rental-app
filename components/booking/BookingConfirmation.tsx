import { CheckCircle, Car, Calendar, DollarSign, Phone } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';

interface BookingConfirmationProps {
  bookingId: string;
  car: {
    name: string;
  };
  dates: {
    start: string;
    end: string;
  };
  total: number;
  status: 'pending' | 'confirmed';
  owner?: {
    name: string;
    phone: string;
  };
}

export function BookingConfirmation({
  bookingId,
  car,
  dates,
  total,
  status,
  owner,
}: BookingConfirmationProps) {
  return (
    <div className="flex flex-col gap-4">

      {/* Success header */}
      <div className="bg-bg-card rounded-2xl shadow-sm p-6 flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 rounded-full bg-brand-subtle flex items-center justify-center">
          <CheckCircle size={28} className="text-brand" />
        </div>
        <h1 className="text-lg font-semibold text-text-base">Заявка отправлена!</h1>
        <p className="text-sm text-text-muted">
          Ожидайте подтверждения от владельца. Мы уведомим вас как только он ответит.
        </p>
        <span className="text-xs text-text-muted">Бронь #{bookingId}</span>
      </div>

      {/* Details */}
      <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">
          Детали брони
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-bg-disabled border border-border-default flex items-center justify-center shrink-0">
              <Car size={16} className="text-text-muted" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Автомобиль</p>
              <p className="text-sm font-medium text-text-secondary">{car.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-bg-disabled border border-border-default flex items-center justify-center shrink-0">
              <Calendar size={16} className="text-text-muted" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Даты</p>
              <p className="text-sm font-medium text-text-secondary">{dates.start} — {dates.end}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-bg-disabled border border-border-default flex items-center justify-center shrink-0">
              <DollarSign size={16} className="text-text-muted" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Итого</p>
              <p className="text-sm font-medium text-text-secondary">${total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex items-center gap-3">
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
          status === 'confirmed' ? 'bg-brand' : 'bg-status-warning'
        }`} />
        <div>
          <p className="text-sm font-medium text-text-secondary">
            {status === 'confirmed' ? 'Подтверждено' : 'Ожидает подтверждения владельца'}
          </p>
          <p className="text-xs text-text-muted">
            {status === 'confirmed'
              ? 'Владелец подтвердил вашу бронь'
              : 'Обычно владельцы отвечают в течение 1 часа'}
          </p>
        </div>
      </div>

      {/* Owner contact — only after confirmed */}
      {status === 'confirmed' && owner && (
        <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-subtle flex items-center justify-center shrink-0">
            <Phone size={16} className="text-brand" />
          </div>
          <div>
            <p className="text-xs text-text-muted">Контакт владельца</p>
            <p className="text-sm font-medium text-text-secondary">{owner.name}</p>
            <p className="text-sm text-text-link">{owner.phone}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Link href="/bookings">
          <Button className="w-full">Мои бронирования</Button>
        </Link>
        <Link
          href="/search"
          className="text-sm text-text-muted hover:text-text-secondary transition-colors text-center"
        >
          Вернуться к поиску
        </Link>
      </div>

    </div>
  );
}