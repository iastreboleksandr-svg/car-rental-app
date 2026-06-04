'use client';

import { useState } from 'react';
import { Fuel, Settings2, Users, Star, ShieldCheck } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface BookingCardProps {
  pricePerDay: number;
  deposit: number;
  fuel: string;
  transmission: string;
  seats: number;
  rating: number;
}

export function BookingCard({ pricePerDay, deposit, fuel, transmission, seats, rating }: BookingCardProps) {
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBook = () => {
    setLoading(true);
    setTimeout(() => {
      setBooked(true);
      setLoading(false);
    }, 800);
  };

  const features = [
    { icon: <Fuel size={14} />, label: 'Топливо', value: fuel },
    { icon: <Settings2 size={14} />, label: 'КПП', value: transmission },
    { icon: <Users size={14} />, label: 'Мест', value: seats },
    { icon: <Star size={14} />, label: 'Рейтинг', value: rating },
  ];

  return (
    <div className="w-full lg:w-72 lg:sticky lg:top-20 flex flex-col gap-3">
      <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Бронирование</p>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-text-base">${pricePerDay}</span>
            <span className="text-sm text-text-muted">/ день</span>
          </div>
          <p className="text-sm text-text-muted mt-0.5">Депозит: ${deposit}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {features.map(({ icon, label, value }) => (
            <div key={label} className="bg-bg-disabled rounded-xl p-3 flex items-center gap-2">
              <span className="text-text-muted">{icon}</span>
              <div>
                <p className="text-xs text-text-muted">{label}</p>
                <p className="text-sm font-medium text-text-secondary">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full" onClick={handleBook} disabled={loading || booked}>
          {booked ? '✓ Забронировано' : loading ? 'Обработка...' : 'Забронировать'}
        </Button>
      </div>
      <div className="bg-bg-card rounded-2xl shadow-sm p-4 flex gap-3 items-start">
        <ShieldCheck size={16} className="text-brand mt-0.5 shrink-0" />
        <p className="text-xs text-text-muted leading-relaxed">
          Ваш платёж защищён. Средства поступают владельцу только после начала аренды.
        </p>
      </div>
    </div>
  );
}