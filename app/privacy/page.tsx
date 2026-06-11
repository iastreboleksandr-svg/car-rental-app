import { getLocale } from 'next-intl/server';
import { PrivacyRu } from './content/ru';
import { PrivacyDe } from './content/de';
import { PrivacyEn } from './content/en';

export default async function PrivacyPage() {
  const locale = await getLocale();

  if (locale === 'de') return <PrivacyDe />;
  if (locale === 'ru') return <PrivacyRu />;
  return <PrivacyEn />;
}