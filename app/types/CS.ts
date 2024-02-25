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

export const categoryList: {[key: string]: string} = {
  CREATE_FUNDING: '펀딩 생성',
  PARTICIPATE_FUNDING: '펀딩 참여',
  DELIVERY: '배송',
  CANCEL_REFUND: '취소/환불',
  MEMBER: '회원',
  ETC: '기타',
};

export interface CustomerServicePostItem {
  id: number;
  category: string;
  content: string;
  answer: string;
}
