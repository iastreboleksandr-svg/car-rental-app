'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface ReviewFormProps {
  onSubmit?: (rating: number, text: string) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit?.(rating, text);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
          <Star size={24} className="text-green-500 fill-green-500" />
        </div>
        <p className="text-sm font-medium text-gray-700">Спасибо за отзыв!</p>
        <p className="text-xs text-gray-400">Ваш отзыв опубликован</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        Оставить отзыв
      </p>

      {/* Stars */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">Оценка</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(s)}
            >
              <Star
                size={32}
                className={
                  s <= (hovered || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-xs text-gray-400">
            {['', 'Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'][rating]}
          </p>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-gray-600">Комментарий</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Расскажите о поездке..."
          rows={4}
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm
           text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#48C964]/20 
           focus:border-[#48C964] transition-colors resize-none"
        />
      </div>

      <Button className="w-full" onClick={handleSubmit} disabled={rating === 0}>
        Отправить отзыв
      </Button>
    </div>
  );
}
