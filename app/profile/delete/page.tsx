'use client';

import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from '@/components/atoms/Button';
import { PrivateRoute } from '@/components/layout/PrivateRoute';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';

function DeleteProfile() {
  const t = useTranslations('userProfile.deletePage');
  const { handleDelete, isDeleting, error } = useDeleteAccount();

  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-8 max-w-md w-full">
        <div className="w-12 h-12 rounded-full bg-bg-error flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} className="text-text-error" />
        </div>

        <h1 className="text-lg font-semibold text-text-base text-center mb-2">{t('title')}</h1>
        <p className="text-sm text-text-muted text-center mb-8">{t('description')}</p>

        {error && <p className="text-sm text-text-error text-center mb-4">{error}</p>}

        <div className="flex flex-col gap-3">
          <Button
            variant="danger"
            className="w-full"
            leftIcon={<Trash2 size={16} />}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? t('deleting') : t('confirm')}
          </Button>

          <Link
            href="/profile"
            className="text-sm text-center text-text-secondary hover:text-text-base transition-colors"
          >
            {t('cancel')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DeleteProfilePage() {
  return (
    <PrivateRoute>
      <DeleteProfile />
    </PrivateRoute>
  );
}
