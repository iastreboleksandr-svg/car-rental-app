'use client';

import { MessageCircle } from 'lucide-react';
import StarRating from '@/components/atoms/StarRating';
import Avatar from '@/components/atoms/Avatar';

interface CarOwnerProps {
  firstName: string;
  lastName: string;
  rating: number;
  totalRentals: number;
}

export default function CarOwner({ firstName, lastName, rating, totalRentals }: CarOwnerProps) {
  return (
    <div className="border-t border-gray-100 pt-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Владелец</p>
      <div className="flex items-center gap-3">
        <Avatar firstName={firstName} lastName={lastName} size="lg" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">{firstName} {lastName}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <StarRating value={rating} readonly size="sm" />
            <span className="text-xs text-gray-400">{rating} · {totalRentals} аренд</span>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors">
          <MessageCircle size={13} />
          Написать
        </button>
      </div>
    </div>
  );
}