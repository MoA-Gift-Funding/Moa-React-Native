export interface AnnounceItem {
  id: number;
  title: string;
  content: string;
  createdDate: string;
}

export type CSCategories =
  | 'CREATE_FUNDING'
  | 'PARTICIPATE_FUNDING'
  | 'DELIVERY'
  | 'CANCEL_REFUND'
  | 'MEMBER'
  | 'ETC';
