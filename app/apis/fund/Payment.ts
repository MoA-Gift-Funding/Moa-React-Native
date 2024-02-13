import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export default class Payment {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }

  // payment
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
      throw error;
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
