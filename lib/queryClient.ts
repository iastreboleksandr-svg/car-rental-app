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

// The QueryClient is created inside the <Providers> component, but the auth
// store (a plain module) needs to wipe the cache on logout. We register the
// active client here so non-React code can reach it.
let activeClient: QueryClient | null = null;

export function setActiveQueryClient(client: QueryClient): void {
  activeClient = client;
}

// Clear ALL cached queries (e.g. on logout) so the next user never sees the
// previous user's data flash before it refetches.
export function clearQueryCache(): void {
  activeClient?.clear();
}
