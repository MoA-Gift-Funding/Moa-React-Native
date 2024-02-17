import {
  FundRequestStatus,
  NewFundItem,
  ShippingInfo,
} from '../../types/Funding';
import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export default class Funding {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }

  async getAddresses() {
    try {
      const addrs = await this.apiClient.getMyAddresses();
      return addrs.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        case 404:
          error.response.data.message = '배송지를 찾을 수 없어요🥲';
          throw error;
        default:
          throw error;
      }
    }
  }

  async createAddress(data: Omit<ShippingInfo, 'id'>) {
    try {
      const addr = await this.apiClient.createAddress(data);
      const id = addr.headers.location.split('/');
      return id[2];
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async updateAddress(data: Omit<ShippingInfo, 'id'>, id: number) {
    try {
      const addr = await this.apiClient.updateAddress(data, id);
      return addr.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async deleteAddress(id: number) {
    try {
      const deleted = await this.apiClient.deleteAddress(id);
      return deleted.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async createFunding(data: NewFundItem) {
    try {
      const fund = await this.apiClient.createFunding(data);
      return fund.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        case 404:
          error.response.data.message =
            '상품이 존재하지 않아요. 고객센터로 문의해주세요😭';
          throw error;
        default:
          throw error;
      }
    }
  }

  async findMyFundings(
    page: number = 0,
    size: number = 10,
    sort: string = 'endDate,ASC',
  ) {
    try {
      const funds = await this.apiClient.findMyFundings(page, size, sort);
      return funds.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async findFriendFundings(
    statuses: FundRequestStatus = 'PROCESSING',
    page: number = 0,
    size: number = 10,
    sort: string = 'endDate,ASC',
  ) {
    try {
      const funds = await this.apiClient.findFriendFundings(
        statuses,
        page,
        size,
        sort,
      );
      return funds.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async getFundDetail(id: number) {
    try {
      const fund = await this.apiClient.getFundingDetail(id);
      return fund.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        case 403:
          error.response.data.message = '펀딩이 존재하지 않아요😭';
          throw error;
        default:
          throw error;
      }
    }
  }

  async joinFund(data: {
    orderId: number;
    paymentOrderId: string;
    message: string;
    visible: 'PUBLIC' | 'PRIVATE';
  }) {
    try {
      const join = await this.apiClient.joinFund(data);
      return join.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        case 400:
          error.response.data.message = '진행이 종료된 펀딩이예요🫠';
          throw error;
        default:
          throw error;
      }
    }
  }
}
