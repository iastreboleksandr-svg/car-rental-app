import { getLocale } from 'next-intl/server';
import { HowItWorksRu } from './content/ru';
import { HowItWorksDe } from './content/de';
import { HowItWorksEn } from './content/en';

export default async function HowItWorksPage() {
  const locale = await getLocale();
  if (locale === 'de') return <HowItWorksDe />;
  if (locale === 'ru') return <HowItWorksRu />;
  return <HowItWorksEn />;
}