import { getLocale } from 'next-intl/server';
import { InsuranceRu } from './content/ru';
import { InsuranceDe } from './content/de';
import { InsuranceEn } from './content/en';

export default async function InsurancePage() {
  const locale = await getLocale();
  if (locale === 'de') return <InsuranceDe />;
  if (locale === 'ru') return <InsuranceRu />;
  return <InsuranceEn />;
}