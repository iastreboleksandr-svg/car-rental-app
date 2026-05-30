'use client';

import { useState } from 'react';
import { Car, Check, X } from 'lucide-react';
import Button from '@/components/atoms/Button';

// ─── Типы ────────────────────────────────────────────────────────────────────

type BookingStatus = 'pending' | 'confirmed' | 'declined';
type FilterTab = 'all' | 'pending' | 'confirmed';

interface IncomingBooking {
  id: number;
  renterFirstName: string;
  renterLastName: string;
  carName: string;
  dates: string;
  days: number;
  total: number;
  status: BookingStatus;
}

// ─── Моковые данные ───────────────────────────────────────────────────────────

const MOCK_BOOKINGS: IncomingBooking[] = [
  {
    id: 1,
    renterFirstName: 'Максим',
    renterLastName: 'Р.',
    carName: 'Toyota Camry 2021',
    dates: '01.06 - 05.06',
    days: 4,
    total: 200,
    status: 'pending',
  },
  {
    id: 2,
    renterFirstName: 'Алина',
    renterLastName: 'И.',
    carName: 'Toyota Camry 2021',
    dates: '10.06 - 12.06',
    days: 2,
    total: 100,
    status: 'pending',
  },
  {
    id: 3,
    renterFirstName: 'Дмитрий',
    renterLastName: 'С.',
    carName: 'Honda Civic 2020',
    dates: '15.05 - 17.05',
    days: 2,
    total: 70,
    status: 'confirmed',
  },
];

// ─── Конфиг статусов ─────────────────────────────────────────────────────────

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: 'Ожидает', className: 'text-orange-500 bg-orange-50' },
  confirmed: { label: 'Подтверждено', className: 'text-green-600 bg-green-50' },
  declined: { label: 'Отклонено', className: 'text-gray-400 bg-gray-50' },
};

// ─── Вкладки фильтра ─────────────────────────────────────────────────────────

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'pending', label: 'Ожидают' },
  { key: 'confirmed', label: 'Подтверждённые' },
];

// ─── Компонент страницы ───────────────────────────────────────────────────────

export default function IncomingBookingsPage() {
  // Список броней — в реальности придёт с API
  const [bookings, setBookings] = useState<IncomingBooking[]>(MOCK_BOOKINGS);

  // Активная вкладка фильтра
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Подтверждение брони
  const handleConfirm = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'confirmed' } : b))
    );
  };

  // Отклонение брони
  const handleDecline = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'declined' } : b))
    );
  };

  // Фильтрация по вкладке
  // 'all' — все кроме отклонённых, 'pending' — только ожидающие, 'confirmed' — только подтверждённые
  const filtered = bookings.filter((b) => {
    if (activeTab === 'all') return b.status !== 'declined';
    return b.status === activeTab;
  });

  // Считаем количество ожидающих для бейджа на вкладке
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">

        {/* Заголовок */}
        <h1 className="text-xl font-semibold text-gray-900">Входящие брони</h1>

        {/* Вкладки фильтра */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition-colors
                ${activeTab === key
                  ? 'bg-[#48C964] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {label}
              {/* Бейдж с количеством только на вкладке "Ожидают" */}
              {key === 'pending' && pendingCount > 0 && (
                <span className={`
                  text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center
                  ${activeTab === 'pending' ? 'bg-white/30 text-white' : 'bg-orange-100 text-orange-500'}
                `}>
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Список броней */}
        {filtered.length === 0 ? (
          // Пустое состояние
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex flex-col items-center gap-2">
            <Car size={32} className="text-gray-200" />
            <p className="text-sm text-gray-400">Нет броней в этой категории</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((booking) => (
              <BookingIncomingItem
                key={booking.id}
                booking={booking}
                onConfirm={handleConfirm}
                onDecline={handleDecline}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// ─── Карточка одной входящей брони ───────────────────────────────────────────

interface BookingIncomingItemProps {
  booking: IncomingBooking;
  onConfirm: (id: number) => void;
  onDecline: (id: number) => void;
}

function BookingIncomingItem({ booking, onConfirm, onDecline }: BookingIncomingItemProps) {
  const { label, className } = statusConfig[booking.status];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4">

      {/* Верхняя строка: иконка машины + инфо + статус */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
          <Car size={22} className="text-gray-400" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Название машины */}
          <p className="text-sm font-semibold text-gray-900 truncate">{booking.carName}</p>
          {/* Даты */}
          <p className="text-sm text-gray-500">{booking.dates}</p>
          {/* Кто бронирует */}
          <p className="text-xs text-gray-400 mt-0.5">
            {booking.renterFirstName} {booking.renterLastName}
          </p>
        </div>

        {/* Бейдж статуса */}
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${className}`}>
          {label}
        </span>
      </div>

      {/* Нижняя строка: сумма + кнопки действий */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-gray-900">${booking.total}</p>
          <p className="text-xs text-gray-400">{booking.days} дн. аренды</p>
        </div>

        {/* Кнопки только для pending броней */}
        {booking.status === 'pending' && (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<X size={14} />}
              onClick={() => onDecline(booking.id)}
            >
              Отклонить
            </Button>
            <Button
              size="sm"
              leftIcon={<Check size={14} />}
              onClick={() => onConfirm(booking.id)}
            >
              Подтвердить
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}
