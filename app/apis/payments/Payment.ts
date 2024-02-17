import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export default class Payment {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }

  async sendPayInfo(data: {orderId: string; amount: number}) {
    try {
      const processed = await this.apiClient.sendPayInfo(data);
      return processed.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async sendSuccessPayment(
    paymentKey: string,
    orderId: string,
    amount: number,
  ) {
    try {
      const success = await this.apiClient.sendSuccessPayment(
        paymentKey,
        orderId,
        amount,
      );
      return success.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        case 400:
          error.response.data.message =
            '잘못된 결제정보예요. 다시 시도해주세요🥲';
          throw error;
        case 403:
          error.response.data.message =
            '잘못된 접근 요청이예요. 다시 시도해주세요🥲';
          throw error;
        case 404:
          error.response.data.message =
            '결제 정보를 찾을 수 없어요. 다시 시도해주세요🥲';
          throw error;
        default:
          throw error;
      }
    }
  }

  async sendFailPayment(message: string, code: string) {
    try {
      const fail = await this.apiClient.sendFailPayment(message, code);
      return fail.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }
}
