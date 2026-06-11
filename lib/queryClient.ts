import { QueryClient } from '@tanstack/react-query';

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  });
}

let activeClient: QueryClient | null = null;

export function setActiveQueryClient(client: QueryClient): void {
  activeClient = client;
}

export function clearQueryCache(): void {
  activeClient?.clear();
}
