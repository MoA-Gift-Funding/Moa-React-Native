export interface OrderResponse {
  content: Order[];
  hasNext: true;
  currentPage: number;
  pageSize: number;
}

export type OrderStatus = 'WAITING_RECEIVE' | 'COMPLETE_RECEIVE' | 'REFUND';

export type Order = {
  orderId: number;
  productId: {
    productId: string;
    productProvider: 'WINCUBE';
  };
  imageUrl: string;
  brand: string;
  category: string;
  productName: string;
  status: OrderStatus;
  price: number;
  orderDate: string;
};

export interface OrderDetailItem {
  orderId: number;
  orderDate: string;
  productId: {
    productId: string;
    productProvider: 'WINCUBE';
  };
  imageUrl: string;
  brand: string;
  category: string;
  productName: string;
  price: number;
  possibleReissueCouponCount: number;
  status: OrderStatus;
  address: {
    zonecode: string;
    roadAddress: string;
    jibunAddress: string;
    detailAddress: string;
    name: string;
    recipientName: string;
    phoneNumber: string;
  };
  deliveryRequestMessage: string;
  payment: {
    participantPayments: [
      {
        memberId: number;
        customNickname: string;
        realNickname: string;
        amount: number;
      },
    ];
    myPayment: {
      amount: number;
    };
  };
}
