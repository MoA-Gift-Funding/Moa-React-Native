import {MessageStatus} from './Funding';
import {Categories} from './Store';

export type RootStackParamList = {
  Home: undefined;
  StoreMain: undefined;
  ItemDetail: {
    id: number;
    imageUrl: string;
    brand: string;
    productName: string;
    price: number;
    discountRate: number;
  };
  ItemList: {category: Categories};
  NewFund: {id: number; price: number};
  NewFundShipping: {
    productId: number;
    title: string;
    description: string;
    endDate: string;
    maximumAmount: number;
  };
  FundCompleted: undefined;
  FriendFundList: undefined;
  FundDetail: {id: number; title?: string; endDate?: string};
  JoinFund: {
    maximumAmount: number;
    remainAmount: number;
    id: number;
    title: string;
    nickName: string;
  };
  JoinFundMSG: {
    price: number;
    id: number;
    title: string;
    nickName: string;
  };
  JoinFundPay: {
    price: number;
    id: number;
    title: string;
    visibility: MessageStatus;
    message: string;
    nickName: string;
    isFundOwner: boolean;
  };
  JoinFundCompleted: {nickName: string};
  FinishFundCompleted: {nickName: string};
  MyPageMain: undefined;
  MyPageDetail: undefined;
  MyFunding: undefined;
  MyFriends: undefined;
  MyMessages: undefined;
  MyNotification: undefined;
  MyOrders: undefined;
  MyOrder: {
    orderId: number;
    imageUrl: string;
    brand: string;
    productName: string;
    price: number;
  };
  Announces: undefined;
  CustomerCenter: {personalInquiry: boolean};
  AppConfig: undefined;
  MoA: undefined;
  Login: undefined;
  Join: undefined;
  PhoneValidation: undefined;
  Contact: undefined;
  JoinCompleted: undefined;
};
