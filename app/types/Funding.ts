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

export interface FundItem {
  endDate: string;
  fundedAmount: number;
  fundingRate: number;
  fundingStatus: '진행중' | '배달완료' | '배송대기' | '취소';
  id: number;
  participationCount: number;
  productImageUrl: string;
  title: string;
}

export interface Fund {
  productId: number;
  userId: number;
  title: string;
  description: string;
  recipientName: string;
  phoneNumber: string;
  zonecode: number;
  roadAddress: string;
  detailedAddress: string;
  upperPriceLimit: string;
  deadline: string;
  agreement: 'Y';
}

export interface FundingItem {
  id: number;
  title: string;
  deadline: string;

  activated: string;

  userId: number;
  profileImage: string;
  userName: string;

  productId: number;
  productImage: string;
}

export interface MyFundingItem {
  id: number;
  title: string;
  deadline: string;

  fundRate: number;
  activated: string;

  fundedCount: number;
}

export interface CreatedFund {
  id: number;
  title: string;
  deadline: string;

  fundRate: number;
  activated: string;

  productImage: string;

  fundedCount: number;
}

export interface ParticipatedFund {
  id: number;
  title: string;
  activated: string;

  productImage: string;

  name: string;

  paidDate: string;
  price: string;
}

export const defaultFundingItem = {
  title: '',
  deadline: '',
  fundRate: '',
  remainingAmount: '',
  terminated: '',
  userId: '',
  profileImage: '',
  userName: '',
  productId: '',
  productImage: '',
};

export interface FundMessageItem {
  message: string;
  name: string;
  createdAt: string;
  profileImage: string;
}
