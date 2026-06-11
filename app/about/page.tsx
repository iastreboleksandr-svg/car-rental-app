import { getLocale } from 'next-intl/server';
import { AboutRu } from './content/ru';
import { AboutDe } from './content/de';
import { AboutEn } from './content/en';

export default async function AboutPage() {
  const locale = await getLocale();
  if (locale === 'de') return <AboutDe />;
  if (locale === 'ru') return <AboutRu />;
  return <AboutEn />;
}