'use client';

import { useState } from 'react';
import { BookingsTabs } from './BookingsTabs';
import { BookingItem } from './BookingItem';

type Status = 'CONFIRMED' | 'PENDING' | 'CANCELLED';
type Tab = 'all' | 'active' | 'completed' | 'cancelled';

interface Booking {
  id: number;
  dates: string;
  total: number;
  status: Status;
}

const mockBookings: Booking[] = [
  { id: 1, dates: '01.06 - 05.06', total: 400, status: 'CONFIRMED' },
  { id: 2, dates: '10.06 - 12.06', total: 210, status: 'PENDING' },
  { id: 3, dates: '15.05 - 17.05', total: 150, status: 'CANCELLED' },
];

const tabFilter: Record<Tab, (b: Booking) => boolean> = {
  all: () => true,
  active: (b) => b.status === 'CONFIRMED' || b.status === 'PENDING',
  completed: (b) => b.status === 'CONFIRMED',
  cancelled: (b) => b.status === 'CANCELLED',
};

export function BookingsList() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const handleCancel = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' } : b))
    );
  };

  const filtered = bookings.filter(tabFilter[activeTab]);
  const activeCount = bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'PENDING').length;

  return (
    <div className="flex flex-col gap-4">
      <BookingsTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        activeCounts={activeCount}
      />
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">Нет бронирований</p>
        ) : (
          filtered.map((b) => (
            <BookingItem key={b.id} {...b} onCancel={handleCancel} />
          ))
        )}
      </div>
    </div>
  );
}