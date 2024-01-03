export interface NewFunding {
  title: string;
  description: string;
  upperPriceLimit: string;
  deadline: string;
}

export interface ShippingInfo {
  recipientName: string;
  roadAddress: string;
  detailedAddress: string;
  zonecode: number;
  phoneNumber: string;
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
