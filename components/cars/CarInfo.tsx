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
    <span className="px-3 py-1 bg-bg-disabled text-text-secondary text-xs font-medium rounded-full">
      {label}
    </span>
  );
}

export default function CarInfo({ name, year, rating, reviewsCount, fuel, transmission,
  seats, description }: CarInfoProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-5">
      <div>
        <p className="text-xs text-text-muted mb-1">{year}</p>
        <h1 className="text-xl font-semibold text-text-base mb-2">{name}</h1>
        <div className="flex items-center gap-2">
          <StarRating value={rating} readonly size="sm" />
          <span className="text-sm text-text-muted">({reviewsCount} отзывов)</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Tag label={fuel} />
        <Tag label={transmission} />
        <Tag label={`${seats} мест`} />
      </div>

      <div className="border-t border-border-disabled pt-5">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
          Описание</p>
        <p className={`text-sm text-text-muted leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
          {description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm text-text-link hover:text-brand-hover mt-2 transition-colors"
        >
          {expanded ? 'Скрыть' : 'Показать больше'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </div>
  );
}