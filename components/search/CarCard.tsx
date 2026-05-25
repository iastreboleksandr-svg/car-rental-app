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
          className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-[#e4eaf0] fill-[#e4eaf0]'}
        />
      ))}
    </div>
  );
}

export function CarCard({ id, price, rating, reviews }: CarCardProps) {
  return (
    <div className="border border-[#e4eaf0] rounded-xl p-3 flex flex-col gap-2 cursor-pointer hover:border-[#d4f5dc] hover:shadow-[0_4px_24px_rgba(72,201,100,0.1)] transition-all">
      <div className="w-full h-24 bg-[#f0fdf3] rounded-lg flex items-center justify-center text-[#48C964]">
        <Car size={32} />
      </div>
      <div className="h-2.5 w-3/4 bg-[#e4eaf0] rounded" />
      <div className="h-2 w-1/2 bg-[#f4f7f9] rounded" />
      <p className="text-sm font-semibold text-[#48C964]">${price}/д</p>
      {reviews > 0 && (
        <div className="flex items-center gap-1">
          <StarRating rating={rating} />
          <span className="text-xs text-[#8a97a8]">({reviews})</span>
        </div>
      )}
    </div>
  );
}