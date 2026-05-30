'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StarRating from '@/components/atoms/StarRating';

interface CarInfoProps {
  name: string;
  year: number;
  rating: number;
  reviewsCount: number;
  fuel: string;
  transmission: string;
  seats: number;
  description: string;
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
      {label}
    </span>
  );
}

export default function CarInfo({ name, year, rating, reviewsCount, fuel, transmission, 
  seats, description }: CarInfoProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-5">
      <div>
        <p className="text-xs text-gray-400 mb-1">{year}</p>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">{name}</h1>
        <div className="flex items-center gap-2">
          <StarRating value={rating} readonly size="sm" />
          <span className="text-sm text-gray-400">({reviewsCount} отзывов)</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Tag label={fuel} />
        <Tag label={transmission} />
        <Tag label={`${seats} мест`} />
      </div>

      <div className="border-t border-gray-100 pt-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Описание</p>
        <p className={`text-sm text-gray-500 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
          {description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm text-[#48C964] hover:text-[#32a84d]
           mt-2 transition-colors"
        >
          {expanded ? 'Скрыть' : 'Показать больше'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </div>
  );
}