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
