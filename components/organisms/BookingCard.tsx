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

export default function BookingCard({ pricePerDay, deposit, fuel, transmission, seats, rating }: BookingCardProps) {
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBook = () => {
    setLoading(true);
    setTimeout(() => {
      setBooked(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Бронирование</p>

        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-800">${pricePerDay}</span>
            <span className="text-sm text-gray-400">/ день</span>
          </div>
          <p className="text-sm text-gray-400 mt-0.5">Депозит: ${deposit}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: <Fuel size={14} />, label: 'Топливо', value: fuel },
            { icon: <Settings2 size={14} />, label: 'КПП', value: transmission },
            { icon: <Users size={14} />, label: 'Мест', value: seats },
            { icon: <Star size={14} />, label: 'Рейтинг', value: rating },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
              <span className="text-gray-400">{icon}</span>
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-700">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full" onClick={handleBook} disabled={loading || booked}>
          {booked ? '✓ Забронировано' : loading ? 'Обработка...' : 'Забронировать'}
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 flex gap-3 items-start">
        <ShieldCheck size={16} className="text-blue-500 mt-0.5 shrink-0" />
        <p className="text-xs text-gray-400 leading-relaxed">
          Ваш платёж защищён. Средства поступают владельцу только после начала аренды.
        </p>
      </div>
    </div>
  );
}