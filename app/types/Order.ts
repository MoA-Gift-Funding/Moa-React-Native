export interface OrderResponse {
  content: Order[];
  hasNext: true;
  currentPage: number;
  pageSize: number;
}

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
