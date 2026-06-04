import { Car, Star } from 'lucide-react';
import Link from 'next/link';

interface CarCardProps {
  id: number;
  price: number;
  rating: number;
  reviews: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= rating ? 'text-status-star fill-status-star' : 'text-border-default fill-border-default'}
        />
      ))}
    </div>
  );
}

export function CarCard({ id, price, rating, reviews }: CarCardProps) {
  return (
    <Link
      href={`/cars/${id}`}
      className="border border-border-default rounded-xl p-3 flex flex-col gap-2 cursor-pointer hover:border-brand hover:shadow-sm transition-all"
    >
      <div className="w-full h-24 bg-brand-subtle rounded-lg flex items-center justify-center text-brand">
        <Car size={32} />
      </div>
      <div className="h-2.5 w-3/4 bg-border-default rounded" />
      <div className="h-2 w-1/2 bg-bg-page rounded" />
      <p className="text-sm font-semibold text-brand">${price}/д</p>
      {reviews > 0 && (
        <div className="flex items-center gap-1">
          <StarRating rating={rating} />
          <span className="text-xs text-text-muted">({reviews})</span>
        </div>
      )}
    </Link>
  );
}