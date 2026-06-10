'use client';

import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';

export default function DeleteProfilePage() {
  const router = useRouter();

  const handleDelete = async () => {
    // TODO: вызов API удаления аккаунта
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center px-4">
      <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-8 max-w-md w-full">

        {/* Иконка */}
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} className="text-status-error" />
        </div>

        {/* Текст */}
        <h1 className="text-lg font-semibold text-text-base text-center mb-2">
          Удалить профиль?
        </h1>
        <p className="text-sm text-text-muted text-center mb-8">
          Это действие необратимо. Все ваши данные, бронирования и объявления будут удалены навсегда.
        </p>

        {/* Кнопки */}
        <div className="flex flex-col gap-3">
          <Button
            variant="danger"
            className="w-full"
            leftIcon={<Trash2 size={16} />}
            onClick={handleDelete}
          >
            Да, удалить аккаунт
          </Button>

          <Link
            href="/profile"
            className="text-sm text-center text-text-secondary hover:text-text-base transition-colors"
          >
            Отмена, вернуться назад
          </Link>
        </div>

      </div>
    </div>
  );
}