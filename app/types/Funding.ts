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

export type FundStatus =
  | 'PROCESSING'
  | 'CANCELLED'
  | 'STOPPED'
  | 'COMPLETE'
  | 'EXPIRED';

type FundResponseStatus = '진행중' | '취소' | '중단' | '완료' | '만료';

export type FundRequestStatus =
  | 'PROCESSING'
  | 'CANCELLED'
  | 'STOPPED'
  | 'COMPLETE'
  | 'EXPIRED'
  | 'PROCESSING, CANCELLED, STOPPED, COMPLETE, EXPIRED'
  | 'PROCESSING, CANCELLED, COMPLETE, EXPIRED';

export interface MyFundItem {
  endDate: string;
  fundedAmount: number;
  fundingRate: number;
  fundingImageUrl: string | null;
  status: FundResponseStatus;
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
  status: FundStatus;
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

export type MessageStatus = 'PUBLIC' | 'PRIVATE';

export interface JoinFundItem {
  fundingId: number;
  paymentOrderId: string;
  message?: string;
  visible?: MessageStatus;
  nickName?: string;
}

export interface FinishFundItem {
  fundingId: number;
  paymentOrderId: string;
  nickName?: string;
}

type ParticipateStatus = 'PARTICIPATING' | 'CANCEL';

export interface ParticipatedFundItem {
  fundingId: number;
  fundingImageUrl: string;
  title: string;
  endDate: string;
  status: FundStatus;
  memberId: number;
  nickName: string;
  profileImageUrl: string;
  productId: number;
  productImageUrl: string;
  participatedDate: string;
  amount: number;
  participateStatus: ParticipateStatus;
}

export interface FundMessageItem {
  profileImageUrl: string;
  nickName: string;
  message: string;
  memberId: number;
  createdDate: string;
}

export interface FundMessagesResponse {
  content: FundDetailItem[];
  hasNext: boolean;
  currentPage: number;
  pageSize: number;
}

export type FundPolicy = {
  title: string;
  content: string[];
};

export interface FundPolicyResponse {
  policies: FundPolicy[];
}
