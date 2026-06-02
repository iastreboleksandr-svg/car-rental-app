import { Car as CarIcon } from 'lucide-react';
import Link from 'next/link';
import StarRating from '@/components/atoms/StarRating';
import type { Car } from '@/types/car';

interface CarCardProps {
  car: Car;
  noReviewsLabel: string;
}

export function CarCard({ car, noReviewsLabel }: CarCardProps) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="border border-[#e4eaf0] rounded-xl p-3 flex flex-col gap-2 cursor-pointer hover:border-[#d4f5dc] hover:shadow-[0_4px_24px_rgba(72,201,100,0.1)] transition-all"
    >
      <div className="w-full h-24 bg-[#f0fdf3] rounded-lg flex items-center justify-center text-[#48C964]">
        <CarIcon size={32} />
      </div>
      <p className="text-sm font-medium text-gray-800 truncate">{car.brand} {car.model}</p>
      <p className="text-xs text-gray-400 truncate">{car.year} · {car.address}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#48C964]">${car.pricePerDay}/д</p>
        {car.averageRating ? (
          <StarRating value={car.averageRating} size="sm" />
        ) : (
          <span className="text-xs text-gray-300">{noReviewsLabel}</span>
        )}
      </div>
    </Link>
  );
}
