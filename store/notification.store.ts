export interface NotificationStore {
  unreadCount: number;
}

export const useNotificationStore = (): NotificationStore => ({
  unreadCount: 0,
});
