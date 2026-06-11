import { getLocale } from 'next-intl/server';
import { ContactRu } from './content/ru';
import { ContactDe } from './content/de';
import { ContactEn } from './content/en';

export default async function ContactPage() {
  const locale = await getLocale();
  if (locale === 'de') return <ContactDe />;
  if (locale === 'ru') return <ContactRu />;
  return <ContactEn />;
}