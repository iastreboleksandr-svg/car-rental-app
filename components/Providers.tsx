'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';
import { createQueryClient, setActiveQueryClient } from '@/lib/queryClient';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  timeZone: string;
}

export function Providers({ children, locale, messages, timeZone }: ProvidersProps) {
  const [queryClient] = useState(() => {
    const client = createQueryClient();
    setActiveQueryClient(client);
    return client;
  });

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextIntlClientProvider>
  );
}
