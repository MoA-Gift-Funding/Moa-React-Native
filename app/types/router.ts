import {MessageStatus} from './Funding';
import {Categories} from './Store';

export type RootStackParamList = {
  HomeScreen: undefined;
  StoreMainScreen: undefined;
  ProductDetailScreen: {
    id: number;
    imageUrl: string;
    brand: string;
    productName: string;
    price: number;
    discountRate: number;
  };
  ProductCategorizedListScreen: {category: Categories};
  NewFundScreen: {id: number; price: number};
  NewFundShippingScreen: {
    productId: number;
    title: string;
    description: string;
    endDate: string;
    maximumAmount: number;
  };
  FundCompletedScreen: undefined;
  FriendFundListScreen: undefined;
  FundDetailScreen: {id: number; title?: string; endDate?: string};
  JoinFundScreen: {
    maximumAmount: number;
    remainAmount: number;
    id: number;
    title: string;
    nickName: string;
  };
  JoinFundMSGScreen: {
    price: number;
    id: number;
    title: string;
    nickName: string;
  };
  JoinFundPayScreen: {
    price: number;
    id: number;
    title: string;
    visibility: MessageStatus;
    message: string;
    nickName: string;
    isFundOwner: boolean;
  };
  JoinFundCompletedScreen: {nickName: string};
  FinishFundCompletedScreen: {nickName: string};
  MyPageMainScreen: undefined;
  MyPageDetailScreen: undefined;
  MyFundingScreen: undefined;
  MyFriendsScreen: undefined;
  MyMessagesScreen: undefined;
  MyNotificationScreen: undefined;
  MyOrdersScreen: undefined;
  MyOrderDetailScreen: {
    orderId: number;
    imageUrl: string;
    brand: string;
    productName: string;
    price: number;
  };
  AnnouncesScreen: undefined;
  CustomerCenterScreen: {personalInquiry: boolean};
  AppConfigScreen: undefined;
  MoATermsAndUsagesScreen: undefined;
  LoginScreen: undefined;
  JoinMoAScreen: undefined;
  PhoneValidationScreen: undefined;
  ProfilePhotoScreen: undefined;
  ContactScreen: undefined;
  JoinCompletedScreen: undefined;
};
