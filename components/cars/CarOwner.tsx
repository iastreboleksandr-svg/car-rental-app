'use client';

import StarRating from '@/components/atoms/StarRating';

interface CarOwnerProps {
  firstName: string;
  lastName: string;
  rating: number;
  totalRentals: number;
}

export default function CarOwner({ firstName, lastName, rating, totalRentals }: CarOwnerProps) {
  return (
    <div className="border-t border-border-default pt-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-brand-ring flex items-center justify-center shrink-0">
        <span className="text-text-inverse text-sm font-semibold">
          {firstName[0]?.toUpperCase()}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-base">
          {firstName} {lastName}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <StarRating value={rating} readonly size="sm" />
          <span className="text-xs text-text-muted">{totalRentals} поездок</span>
        </div>
      </div>
    </div>
  );
}