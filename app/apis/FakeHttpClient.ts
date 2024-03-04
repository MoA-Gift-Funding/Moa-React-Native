import {CSCategories} from './../types/CS';
import axios from 'axios';
import Config from 'react-native-config';
import {
  FundRequestStatus,
  MessageStatus,
  NewFundItem,
  ShippingInfo,
} from '../types/Funding';
import {Contact, User} from '../types/User';

export class FakeHttpClient {
  protected httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: Config.FAKE_BASE_URL,
    });
  }

  // user
  moaAuth(accessToken: string, platform: string) {
    return this.httpClient.get('');
  }

  async getUser() {
    return this.httpClient.get('');
  }

  updateUser(data: Partial<User>) {
    return this.httpClient.get('');
  }

  requestMobileVerification(phoneNumber: string) {
    return this.httpClient.get('');
  }

  verifyMobile(verificationNumber: string) {
    return this.httpClient.get('');
  }

  signUp(user: Partial<User>) {
    return this.httpClient.get('');
  }

  getPresignedUrl(fileName: string) {
    return this.httpClient.get('');
  }

  deactivateUser(accessToken: string) {
    return this.httpClient.get('');
  }

  // friends
  async getFriends() {
    return this.httpClient.get('');
  }

  async syncContact(contacts: {contactList: Contact[]}) {
    return this.httpClient.get('');
  }

  async blockFriend(id: number) {
    return this.httpClient.get('');
  }

  async unblockFriend(id: number) {
    return this.httpClient.get('');
  }

  // funding
  getMyAddresses() {
    return this.httpClient.get('');
  }

  createAddress(data: Omit<ShippingInfo, 'id'>) {
    return this.httpClient.get('');
  }

  updateAddress(data: Omit<ShippingInfo, 'id'>, id: number) {
    return this.httpClient.get('');
  }

  deleteAddress(id: number) {
    return this.httpClient.get('');
  }

  createFunding(data: NewFundItem) {
    return this.httpClient.get('');
  }

  findMyFundings(
    page: number = 0,
    size: number = 10,
    sort: string = 'endDate,ASC',
    statuses: FundRequestStatus = 'PROCESSING, CANCELLED, STOPPED, COMPLETE, EXPIRED',
  ) {
    return this.httpClient.get('');
  }

  findFriendFundings(
    statuses: FundRequestStatus,
    page: number = 0,
    size: number = 10,
    sort: string = 'endDate,ASC',
  ) {
    return this.httpClient.get('');
  }

  getFundingDetail(id: number) {
    return this.httpClient.get('');
  }

  joinFund(data: JoinFundItem) {
    return this.httpClient.get('');
  }

  finishFund({fundingId, paymentOrderId}: FinishFundItem) {
    return this.httpClient.ge('');
  }

  getParticipatedFunds(
    page: number = 0,
    size: number = 10,
    sort: string = 'createdDate,DESC',
  ) {
    return this.httpClient.get('');
  }

  getRecievedMessages(
    page: number = 0,
    size: number = 10,
    sort: string = 'createdDate,DESC',
  ) {
    return this.httpClient.get('');
  }

  updateFundMessage(data: {
    messageId: number;
    message: string;
    visibility: MessageStatus;
  }) {
    return this.httpClient.get('');
  }

  getPolicies() {
    return this.httpClient.get('/fundings/exchange-refund-policy');
  }

  cancelCreatedFund(id: number) {
    return this.httpClient.get('');
  }

  cancelParticipatedFund({
    id,
    fundingParticipantId,
  }: {
    id: number;
    fundingParticipantId: number;
  }) {
    return this.httpClient.get('');
  }

  // order
  getOrders(
    page: number = 0,
    size: number = 10,
    sort: string = 'createdDate,DESC',
  ) {
    return this.httpClient.get('/orders');
  }

  getOrderDetail(orderId: number) {
    return this.httpClient.get(`/orders/${orderId}`);
  }

  cancelOrder(orderId: number) {
    return this.httpClient.get(`/orders/${orderId}/cancel-coupon`);
  }

  // payment
  sendPayInfo(data: {orderId: string; amount: number}) {
    return this.httpClient.get('');
  }

  sendSuccessPayment(paymentKey: string, orderId: string, amount: number) {
    return this.httpClient.get('');
  }

  sendFailPayment(message: string, code: string) {
    return this.httpClient.get('');
  }

  // notification
  hasUnReadNotifications() {
    return this.httpClient.get('');
  }

  getNotifications() {
    return this.httpClient.get('');
  }

  getNotificationStatus() {
    return this.httpClient.get('');
  }

  permitNotification(deviceToken: string) {
    return this.httpClient.get('');
  }

  disallowNotification() {
    return this.httpClient.get('');
  }

  // Report
  reportPost(item: ReportItem) {
    return this.httpClient.get('');
  }

  // Annoucements
  getAnnouncements() {
    return this.httpClient.get('');
  }

  // FAQ-CS
  getFaqs() {
    return this.httpClient.get('');
  }

  // 1:1-CS
  getPersonalInquiries() {
    return this.httpClient.get('');
  }

  postPersonalInquiry(data: {category: CSCategories; content: string}) {
    return this.httpClient.get('');
  }

  // Products
  getProducts() {
    return this.httpClient.get('products');
  }

  getProductDetail(productId: number) {
    return this.httpClient.get(`products/${productId}`);
  }
}
