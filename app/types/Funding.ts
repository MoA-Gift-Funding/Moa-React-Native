export interface NewFunding {
  title: string;
  description: string;
  priceLimit: string;
  deadline: string;
}

export interface ShippingInfo {
  recipientName: string;
  roadAddr: string;
  detailedAddr: string;
  zonecode: number;
  recipientMobile: string;
}
