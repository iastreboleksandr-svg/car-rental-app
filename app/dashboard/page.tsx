'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardCarCard } from '@/components/dashboard/DashboardCarCard';
import { RenterDashboardHeader } from '@/components/dashboard/RenterDashboardHeader';
import { RenterBookingCard } from '@/components/dashboard/RenterBookingCard';
import { useAuthStore } from '@/store/auth.store';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const isRenter = user?.role === 'renter';

  // --- данные арендодателя ---
  const [cars, setCars] = useState([
    { id: 1, name: 'Toyota Camry 2021', status: 'active' as const, price: 50, bookings: 3 },
    { id: 2, name: 'Honda Civic 2020', status: 'inactive' as const, price: 35, bookings: 0 },
  ]);

  const toggleStatus = (id: number) => {
    setCars((prev) =>
      prev.map((car) =>
        car.id === id
          ? { ...car, status: car.status === 'active' ? 'inactive' : 'active' }
          : car
      )
    );
  };

  // --- данные арендатора ---
  const bookings = [
    {
      id: 1,
      carName: 'Toyota Camry 2021',
      status: 'active' as const,
      dateFrom: '10.06.2026',
      dateTo: '14.06.2026',
      totalPrice: 200,
      canCancel: true,
      canReview: false,
    },
    {
      id: 2,
      carName: 'Honda Civic 2020',
      status: 'completed' as const,
      dateFrom: '01.05.2026',
      dateTo: '03.05.2026',
      totalPrice: 70,
      canCancel: false,
      canReview: true,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center">
      <div className="bg-bg-card rounded-2xl border border-border-default shadow-sm w-full max-w-lg p-6 flex flex-col gap-6">

        {isRenter ? <RenterDashboardHeader /> : <DashboardHeader />}

        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold text-brand tracking-widest uppercase bg-brand-subtle border border-brand-subtle self-start px-3 py-1 rounded-full">
            {isRenter ? 'Мои бронирования' : 'Мои машины'}
          </p>

          {isRenter
            ? bookings.map((booking) => (
                <RenterBookingCard key={booking.id} {...booking} />
              ))
            : cars.map((car) => (
                <DashboardCarCard key={car.id} {...car} onToggleStatus={toggleStatus} />
              ))}
        </div>

      </div>
    </div>
  );
}