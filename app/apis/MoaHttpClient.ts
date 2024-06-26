import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import {Contact, User} from '../types/User';
import {
  FinishFundItem,
  FundRequestStatus,
  JoinFundItem,
  MessageStatus,
  NewFundItem,
  ReportItem,
  ShippingInfo,
} from '../types/Funding';
import {CSCategories} from '../types/CS';

export default class MoaHttpClient {
  protected httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: Config.BASE_URL,
    });
  }

  // user
  moaAuth(accessToken: string, platform: string) {
    return this.httpClient.get(`/oauth/login/app/${platform}`, {
      headers: {OAuthAccessToken: accessToken},
    });
  }

  async getUser() {
    const accessToken = await AsyncStorage.getItem('accessToken');
    this.httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return this.httpClient.get('/members/my');
  }

  updateUser(data: Partial<User>) {
    return this.httpClient.put('/members', data);
  }

  requestMobileVerification(phoneNumber: string) {
    return this.httpClient.post('/members/verification/phone/send-number', {
      phoneNumber,
    });
  }

  verifyMobile(verificationNumber: string) {
    return this.httpClient.post('/members/verification/phone/verify', {
      verificationNumber,
    });
  }

  signUp(user: Partial<User>) {
    return this.httpClient.post('/members', user);
  }

  getPresignedUrl(fileName: string) {
    return this.httpClient.post('/infra/aws/s3/presigned-url', {
      fileName,
    });
  }

  deactivateUser(accessToken: string) {
    return this.httpClient.delete('/members', {
      headers: {OAuthAccessToken: accessToken},
    });
  }

  // friends
  async getFriends() {
    return this.httpClient.get('/friends');
  }

  async syncContact(contacts: {contactList: Contact[]}) {
    return this.httpClient.post('/friends/sync-contact', contacts);
  }

  async blockFriend(id: number) {
    return this.httpClient.post(`/friends/block/${id}`);
  }

  async unblockFriend(id: number) {
    return this.httpClient.post(`/friends/unblock/${id}`);
  }

  // funding
  getMyAddresses() {
    return this.httpClient.get('/addresses');
  }

  createAddress(data: Omit<ShippingInfo, 'id'>) {
    return this.httpClient.post('/addresses', data);
  }

  updateAddress(data: Omit<ShippingInfo, 'id'>, id: number) {
    return this.httpClient.put(`/addresses/${id}`, data);
  }

  deleteAddress(id: number) {
    return this.httpClient.delete(`/addresses/${id}`);
  }

  createFunding(data: NewFundItem) {
    return this.httpClient.post('/fundings', data);
  }

  findMyFundings(
    page: number = 0,
    size: number = 10,
    sort: string = 'endDate,ASC',
    statuses: FundRequestStatus = 'PROCESSING, CANCELLED, STOPPED, COMPLETE, EXPIRED',
  ) {
    return this.httpClient.get('/fundings/my', {
      params: {page, size, sort, statuses},
    });
  }

  findFriendFundings(
    statuses: FundRequestStatus = 'PROCESSING',
    page: number = 0,
    size: number = 10,
    sort: string = 'endDate,ASC',
  ) {
    return this.httpClient.get('/fundings', {
      params: {statuses, page, size, sort},
    });
  }

  getFundingDetail(id: number) {
    return this.httpClient.get(`/fundings/${id}`);
  }

  joinFund({
    fundingId,
    paymentOrderId,
    message = '',
    visibility = 'PRIVATE',
  }: JoinFundItem) {
    return this.httpClient.post(`/fundings/${fundingId}/participate`, {
      paymentOrderId,
      message,
      visibility,
    });
  }

  getParticipatedFunds(
    page: number = 0,
    size: number = 10,
    sort: string = 'createdDate,DESC',
  ) {
    return this.httpClient.get('/fundings/participated', {
      params: {page, size, sort},
    });
  }

  finishFund({fundingId, paymentOrderId}: FinishFundItem) {
    return this.httpClient.post(`/fundings/${fundingId}/finish`, {
      paymentOrderId,
    });
  }

  getRecievedMessages(
    page: number = 0,
    size: number = 10,
    sort: string = 'createdDate,DESC',
  ) {
    return this.httpClient.get('/fundings/messages', {
      params: {page, size, sort},
    });
  }

  updateFundMessage({
    messageId,
    message,
    visibility,
  }: {
    messageId: number;
    message: string;
    visibility: MessageStatus;
  }) {
    return this.httpClient.put(`/fundings/messages/${messageId}`, {
      message,
      visibility,
    });
  }

  getPolicies() {
    return this.httpClient.get('/fundings/exchange-refund-policy');
  }

  cancelCreatedFund(id: number) {
    return this.httpClient.post(`/fundings/${id}/cancel`);
  }

  cancelParticipatedFund({
    id,
    fundingParticipantId,
  }: {
    id: number;
    fundingParticipantId: number;
  }) {
    return this.httpClient.post(`/fundings/${id}/cancel-participate`, {
      fundingParticipantId,
    });
  }

  // order
  getOrders(
    page: number = 0,
    size: number = 10,
    sort: string = 'createdDate,DESC',
  ) {
    return this.httpClient.get('/orders', {params: {page, size, sort}});
  }

  getOrderDetail(orderId: number) {
    return this.httpClient.get(`/orders/${orderId}`);
  }

  cancelOrder(orderId: number) {
    return this.httpClient.post(`/orders/${orderId}/cancel-coupon`);
  }

  // payment
  sendPayInfo(data: {orderId: string; amount: number}) {
    return this.httpClient.post('/payments/toss/prepay', data);
  }

  sendSuccessPayment(
    paymentKey: string,
    orderId: string,
    amount: number,
    fundingId?: number,
  ) {
    return this.httpClient.get('/payments/toss/success', {
      params: {paymentKey, orderId, amount},
    });
  }

  sendFailPayment(message: string, code: string) {
    return this.httpClient.get('/payments/toss/fail', {
      params: {code, message},
    });
  }

  // notifications
  hasUnReadNotifications() {
    return this.httpClient.get('/notifications/check');
  }

  getNotifications() {
    return this.httpClient.get('/notifications');
  }

  getNotificationStatus() {
    return this.httpClient.get('/members/notification');
  }

  permitNotification(deviceToken: string) {
    return this.httpClient.post('/members/notification', {deviceToken});
  }

  disallowNotification() {
    return this.httpClient.delete('/members/notification');
  }

  // Report
  reportPost(item: ReportItem) {
    return this.httpClient.post('/reports', item);
  }

  // Announce
  getAnnouncements() {
    return this.httpClient.get('/announcements');
  }

  // FAQ-CS
  getFaqs() {
    return this.httpClient.get('/faqs');
  }

  // 1:1-CS
  getPersonalInquiries() {
    return this.httpClient.get('/personal-inquiries/my');
  }

  postPersonalInquiry(data: {category: CSCategories; content: string}) {
    return this.httpClient.post('/personal-inquiries', data);
  }

  // Products
  getProducts(
    page: number = 0,
    size: number = 10,
    sort: string = 'id,ASC',
    category?:
      | '상품권'
      | '피자/치킨'
      | '뷰티'
      | '식품/건강'
      | '편의점'
      | '리빙/잡화'
      | '영화'
      | undefined,
  ) {
    return this.httpClient.get('products', {
      params: {category, page, size, sort},
    });
  }

  getProductDetail(productId: number) {
    return this.httpClient.get(`products/${productId}`);
  }
}
