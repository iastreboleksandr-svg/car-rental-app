'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Select } from '@/components/atoms/Select';

const LANGUAGES = [
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
  { value: 'de', label: 'DE' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  function handleChange(value: string) {
    document.cookie = `locale=${value}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="w-24">
      <Select options={LANGUAGES} value={locale} onChange={handleChange} />
    </div>
  );
}
