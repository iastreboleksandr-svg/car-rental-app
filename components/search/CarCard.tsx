import { Car, Star } from 'lucide-react';

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
          className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}
        />
      ))}
    </div>
  );
}

export function CarCard({ id, price, rating, reviews }: CarCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-shadow">
      <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        <Car size={32} />
      </div>
      <div className="h-2.5 w-3/4 bg-gray-200 rounded" />
      <div className="h-2 w-1/2 bg-gray-100 rounded" />
      <p className="text-sm font-semibold text-blue-500">${price}/д</p>
      {reviews > 0 && (
        <div className="flex items-center gap-1">
          <StarRating rating={rating} />
          <span className="text-xs text-gray-400">({reviews})</span>
        </div>
      )}
    </div>
  );
}