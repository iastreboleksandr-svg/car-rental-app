import { getLocale } from 'next-intl/server';
import { MobileRu } from './content/ru';
import { MobileDe } from './content/de';
import { MobileEn } from './content/en';

export default async function MobilePage() {
  const locale = await getLocale();
  if (locale === 'de') return <MobileDe />;
  if (locale === 'ru') return <MobileRu />;
  return <MobileEn />;
}