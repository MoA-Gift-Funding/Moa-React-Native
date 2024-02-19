export interface NotificationItem {
  id: number;
  url: string;
  title: string;
  message: string;
  imageUrl: string | null;
  type: 'party' | 'check' | 'message';
  createdDate: string;
  isRead: boolean;
}

export interface NotificationStatus {
  isPermit: boolean;
}
