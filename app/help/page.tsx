

import { getLocale } from 'next-intl/server';
import { HelpRu } from './content/ru';
import { HelpDe } from './content/de';
import { HelpEn } from './content/en';

export default async function HelpPage() {
  const locale = await getLocale();
  if (locale === 'de') return <HelpDe />;
  if (locale === 'ru') return <HelpRu />;
  return <HelpEn />;
}