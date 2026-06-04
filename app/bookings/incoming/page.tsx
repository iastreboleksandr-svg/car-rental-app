'use client';

import { useState } from 'react';
import { Car, Check, X } from 'lucide-react';
import Button from '@/components/atoms/Button';

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

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: 'Ожидает', className: 'text-status-warning bg-bg-warning' },
  confirmed: { label: 'Подтверждено', className: 'text-brand bg-brand-subtle' },
  declined: { label: 'Отклонено', className: 'text-text-muted bg-bg-disabled' },
};

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'pending', label: 'Ожидают' },
  { key: 'confirmed', label: 'Подтверждённые' },
];

export default function IncomingBookingsPage() {
  const [bookings, setBookings] = useState<IncomingBooking[]>(MOCK_BOOKINGS);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const handleConfirm = (id: number) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'confirmed' } : b)));
  };

  const handleDecline = (id: number) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'declined' } : b)));
  };

  const filtered = bookings.filter((b) => {
    if (activeTab === 'all') return b.status !== 'declined';
    return b.status === activeTab;
  });

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-bg-page py-8 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        <h1 className="text-xl font-semibold text-text-base">Входящие брони</h1>

        <div className="flex gap-1 bg-bg-card rounded-xl p-1 shadow-sm border border-border-default">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition-colors
                ${
                  activeTab === key
                    ? 'bg-brand text-text-inverse shadow-sm'
                    : 'text-text-muted hover:text-text-secondary'
                }
              `}
            >
              {label}
              {key === 'pending' && pendingCount > 0 && (
                <span
                  className={`
                  text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center
                  ${activeTab === 'pending' ? 'bg-white/30 text-text-inverse' : 'bg-bg-warning text-status-warning'}
                `}
                >
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-10 flex flex-col items-center gap-2">
            <Car size={32} className="text-text-disabled" />
            <p className="text-sm text-text-muted">Нет броней в этой категории</p>
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

interface BookingIncomingItemProps {
  booking: IncomingBooking;
  onConfirm: (id: number) => void;
  onDecline: (id: number) => void;
}

function BookingIncomingItem({ booking, onConfirm, onDecline }: BookingIncomingItemProps) {
  const { label, className } = statusConfig[booking.status];

  return (
    <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-4 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl border border-border-default bg-bg-disabled flex items-center justify-center shrink-0">
          <Car size={22} className="text-text-muted" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-base truncate">{booking.carName}</p>
          <p className="text-sm text-text-muted">{booking.dates}</p>
          <p className="text-xs text-text-muted mt-0.5">
            {booking.renterFirstName} {booking.renterLastName}
          </p>
        </div>

        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${className}`}>
          {label}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-text-base">${booking.total}</p>
          <p className="text-xs text-text-muted">{booking.days} дн. аренды</p>
        </div>

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
            <Button size="sm" leftIcon={<Check size={14} />} onClick={() => onConfirm(booking.id)}>
              Подтвердить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
