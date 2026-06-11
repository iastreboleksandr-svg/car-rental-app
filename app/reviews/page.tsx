import { ReviewForm } from '@/components/reviews/ReviewForm';

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-bg-page">
      <main className="max-w-lg mx-auto px-4 py-6">
        <ReviewForm />
      </main>
    </div>
  );
}