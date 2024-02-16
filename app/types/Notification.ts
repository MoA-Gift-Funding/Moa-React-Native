export interface NotificationItem {
  id: number;
  url: string;
  message: string;
  isRead: boolean;
}

export interface NotificationStatus {
  isPermit: boolean;
}
