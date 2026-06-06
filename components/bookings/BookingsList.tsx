'use client';

import { useState } from 'react';
import { BookingsTabs } from './BookingsTabs';
import { BookingItem } from './BookingItem';

type Status = 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
type Tab = 'all' | 'active' | 'completed' | 'cancelled';

interface Booking {
  id: number;
  carName: string;
  dates: string;
  total: number;
  status: Status;
}

const mockBookings: Booking[] = [
  { id: 1, carName: 'Toyota Camry 2021', dates: '01.06 - 05.06', total: 400, status: 'CONFIRMED' },
  { id: 2, carName: 'Honda Civic 2020', dates: '10.06 - 12.06', total: 210, status: 'PENDING' },
  { id: 3, carName: 'BMW 3 Series 2019', dates: '15.05 - 17.05', total: 150, status: 'CANCELLED' },
  { id: 4, carName: 'Audi A4 2022', dates: '01.04 - 03.04', total: 300, status: 'COMPLETED' },
];

const tabFilter: Record<Tab, (b: Booking) => boolean> = {
  all: () => true,
  active: (b) => b.status === 'CONFIRMED' || b.status === 'PENDING',
  completed: (b) => b.status === 'COMPLETED',
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
          <p className="text-sm text-text-muted text-center py-8">Нет бронирований</p>
        ) : (
          filtered.map((b) => (
            <BookingItem key={b.id} {...b} onCancel={handleCancel} />
          ))
        )}
      </div>
    </div>
  );
}