import { getLocale } from 'next-intl/server';
import { TermsRu } from './content/ru';
import { TermsDe } from './content/de';
import { TermsEn } from './content/en';

export default async function TermsPage() {
  const locale = await getLocale();

  if (locale === 'de') return <TermsDe />;
  if (locale === 'ru') return <TermsRu />;
  return <TermsEn />;
}