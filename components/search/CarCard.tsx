import { Car as CarIcon } from 'lucide-react';
import Link from 'next/link';
import StarRating from '@/components/atoms/StarRating';
import type { Car } from '@/types/car';

interface CarCardProps {
  car: Car;
  noReviewsLabel: string;
  perDayLabel: string;
}

export function CarCard({
  car,
  // noReviewsLabel,
  //  perDayLabel
}: CarCardProps) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="border border-border-default rounded-xl p-3 flex flex-col gap-2 cursor-pointer hover:border-brand-subtle hover:shadow-[0_4px_24px_rgba(72,201,100,0.1)] transition-all"
    >
      <div className="w-full aspect-[4/3] bg-brand-subtle rounded-lg flex items-center justify-center text-brand overflow-hidden">
        {car.mainPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={car.mainPhoto}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <CarIcon size={32} />
        )}
      </div>
      <p className="text-sm font-medium text-text-base truncate">
        {car.brand} {car.model}
      </p>
      <p className="text-xs text-text-muted truncate">
        {car.year} · {car.address}
      </p>
      {/* <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-brand">${car.pricePerDay}{perDayLabel}</p>
        {car.averageRating ? (
          <StarRating value={car.averageRating} size="sm" />
        ) : (
          <span className="text-xs text-text-disabled">{noReviewsLabel}</span>
        )}
      </div> */}
    </Link>
  );
}
