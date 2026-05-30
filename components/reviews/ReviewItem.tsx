import { Avatar } from '@/components/atoms/Avatar';
import { StarRating } from '@/components/atoms/StarRating';

interface ReviewItemProps {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  date: string;
  text: string;
}

export function ReviewItem({ firstName, lastName, rating, date, text }: ReviewItemProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar firstName={firstName} lastName={lastName} size="sm" />
          <div>
            <p className="text-sm font-medium text-gray-700">{firstName} {lastName}</p>
            <StarRating value={rating} readonly size="sm" />
          </div>
        </div>
        <span className="text-xs text-gray-400 shrink-0">{date}</span>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
    </div>
  );
}