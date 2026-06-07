'use client';

import { useState } from 'react';

export type IncomingBookingStatus = 'pending' | 'confirmed' | 'declined';
export type IncomingFilterTab = 'all' | 'pending' | 'confirmed';

export interface IncomingBooking {
  id: number;
  renterFirstName: string;
  renterLastName: string;
  carName: string;
  dates: string;
  days: number;
  total: number;
  status: IncomingBookingStatus;
}

const MOCK_BOOKINGS: IncomingBooking[] = [
  { id: 1, renterFirstName: 'Максим', renterLastName: 'Р.', carName: 'Toyota Camry 2021', dates: '01.06 - 05.06', days: 4, total: 200, status: 'pending' },
  { id: 2, renterFirstName: 'Алина', renterLastName: 'И.', carName: 'Toyota Camry 2021', dates: '10.06 - 12.06', days: 2, total: 100, status: 'pending' },
  { id: 3, renterFirstName: 'Дмитрий', renterLastName: 'С.', carName: 'Honda Civic 2020', dates: '15.05 - 17.05', days: 2, total: 70, status: 'confirmed' },
];

export function useIncomingBookingsPage() {
  const [bookings, setBookings] = useState<IncomingBooking[]>(MOCK_BOOKINGS);
  const [activeTab, setActiveTab] = useState<IncomingFilterTab>('all');

  function confirmBooking(id: number) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'confirmed' } : b)));
  }

  function declineBooking(id: number) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'declined' } : b)));
  }

  const filtered = bookings.filter((b) => {
    if (activeTab === 'all') return b.status !== 'declined';
    return b.status === activeTab;
  });

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return {
    bookings: filtered,
    activeTab,
    setActiveTab,
    confirmBooking,
    declineBooking,
    pendingCount,
  };
}
