'use client';

import StarRating from '@/components/atoms/StarRating';
import Avatar from '@/components/atoms/Avatar';

interface Review {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  date: string;
  text: string;
}

interface CarReviewsProps {
  reviews: Review[];
  totalCount: number;
}

export default function CarReviews({ reviews, totalCount }: CarReviewsProps) {
  return (
    <div className="border-t border-border-disabled pt-5">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
        Отзывы ({totalCount})
      </p>
      <div className="flex flex-col divide-y divide-border-disabled">
        {reviews.map((r) => (
          <div key={r.id} className="py-4 first:pt-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Avatar firstName={r.firstName} lastName={r.lastName} size="sm" />
                <div>
                  <p className="text-sm font-medium text-text-secondary">{r.firstName} {r.lastName}</p>
                  <StarRating value={r.rating} readonly size="sm" />
                </div>
              </div>
              <span className="text-xs text-text-muted shrink-0">{r.date}</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>

      {totalCount > reviews.length && (
        <button className="w-full mt-2 py-2 border border-border-default rounded-xl text-sm text-text-muted hover:border-text-muted hover:text-text-secondary transition-colors">
          Ещё {totalCount - reviews.length} отзывов
        </button>
      )}
    </div>
  );
}