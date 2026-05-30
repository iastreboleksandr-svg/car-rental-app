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
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={28} className="text-green-500" />
        </div>
        <h1 className="text-lg font-semibold text-gray-800">Заявка отправлена!</h1>
        <p className="text-sm text-gray-500">
          Ожидайте подтверждения от владельца. Мы уведомим вас как только он ответит.
        </p>
        <span className="text-xs text-gray-400">Бронь #{bookingId}</span>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Детали брони
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
              <Car size={16} className="text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Автомобиль</p>
              <p className="text-sm font-medium text-gray-700">{car.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Даты</p>
              <p className="text-sm font-medium text-gray-700">{dates.start} — {dates.end}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
              <DollarSign size={16} className="text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Итого</p>
              <p className="text-sm font-medium text-gray-700">${total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-3">
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
          status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-400'
        }`} />
        <div>
          <p className="text-sm font-medium text-gray-700">
            {status === 'confirmed' ? 'Подтверждено' : 'Ожидает подтверждения владельца'}
          </p>
          <p className="text-xs text-gray-400">
            {status === 'confirmed'
              ? 'Владелец подтвердил вашу бронь'
              : 'Обычно владельцы отвечают в течение 1 часа'}
          </p>
        </div>
      </div>

      {/* Owner contact — only after confirmed */}
      {status === 'confirmed' && owner && (
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Phone size={16} className="text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Контакт владельца</p>
            <p className="text-sm font-medium text-gray-700">{owner.name}</p>
            <p className="text-sm text-blue-500">{owner.phone}</p>
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
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors text-center"
        >
          Вернуться к поиску
        </Link>
      </div>

    </div>
  );
}