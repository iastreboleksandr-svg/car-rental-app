import Link from 'next/link';
import { Car } from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center px-4">
      <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-10 max-w-md w-full flex flex-col items-center gap-4 text-center">

        <div className="w-16 h-16 rounded-full bg-brand-subtle flex items-center justify-center">
          <Car size={32} className="text-brand" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-text-base">404</h1>
          <p className="text-lg font-medium text-text-base mt-1">Страница не найдена</p>
          <p className="text-sm text-text-muted mt-2">
            Такой страницы не существует или она была удалена.
          </p>
        </div>

        <Link href="/search">
          <Button>Вернуться к поиску</Button>
        </Link>

      </div>
    </div>
  );
}