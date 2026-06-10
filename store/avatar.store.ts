import { useSyncExternalStore } from 'react';

// Tiny shared store for the user's avatar so that every place it is shown
// (profile card, header dropdown, ...) stays in sync. No external deps.
//
// NOTE (backend): this currently only holds the avatar in memory. When the
// backend is wired, seed it from user.avatarUrl on login and persist changes
// (PATCH /users/me) whenever setSharedAvatar runs.

let avatar: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function setSharedAvatar(next: string | null) {
  avatar = next;
  emit();
}

export function getSharedAvatar() {
  return avatar;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSharedAvatar(): string | null {
  return useSyncExternalStore(subscribe, getSharedAvatar, () => null);
}
