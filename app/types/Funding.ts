export interface ShippingInfo {
  id: number;
  name: string;
  recipientName: string;
  phoneNumber: string;
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  detailAddress: string;
  isDefault: boolean;
}

export interface NewFundItem {
  productId: number;
  title: string;
  description: string;
  endDate: string;
  maximumAmount: string;
  deliveryAddressId: number;
  deliveryRequestMessage: string;
}

type FundStatus = '진행중' | '배달완료' | '배송대기' | '취소';

export type FundRequestStatus =
  | 'PROCESSING'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'PROCESSING, COMPLETED'
  | 'PROCESSING, COMPLETED, CANCELLED';

export interface MyFundItem {
  endDate: string;
  fundedAmount: number;
  fundingRate: number;
  fundingImageUrl: string | null;
  status: FundStatus;
  id: number;
  participationCount: number;
  productImageUrl: string | null;
  title: string;
}

export interface FundDetailItem {
  id: number;
  memberId: number;
  nickName: string;
  title: string;
  description: string;
  endDate: string;
  maximumAmount: number;
  remainAmount: number;
  fundingRate: number;
  status: string;
  fundedAmount: number;
  participationCount: number;
  productImageUrl: string;
  participants: Participant[];
}

export type Participant = {
  id: number;
  memberId: number;
  nickName: string;
  profileImageUrl: string;
  message: string;
  createAt: string;
};

export interface FundResponse {
  content: FriendFundItem[] | MyFundItem[];
  hasNext: true;
  currentPage: 0;
  pageSize: 0;
}

export interface FriendFundItem {
  fundingId: number;
  title: string;
  endDate: string;
  status: FundStatus;
  memberId: number;
  nickName: string;
  profileImageUrl: string;
  productId: number;
  productImageUrl: string;
}

export interface ReportItem {
  domainType: 'FUNDING' | 'FUNDING_MESSAGE';
  domainId: number;
  content: string;
}
