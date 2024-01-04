export interface OrderListItem {
  orderId: number;
  deliveryStatus: string;
  orderCreatedAt: string;
  brand: string;
  name: string;
  price: string;
  image: string;
}

export type OrderPaymentItem = {
  price: string;
};

export interface ShippingInfo {
  recipientName: string;
  roadAddress: string;
  detailedAddress: string;
  phoneNumber: string;
  zonecode: string;
  deliveryStatus: string;
}
