import * as KaKaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {Axios} from '../axios.config';
import Config from 'react-native-config';
import {OauthProvider, User} from '../../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import appleAuth from '@invertase/react-native-apple-authentication';
import Toast from 'react-native-toast-message';
import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export class Users {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }
  async loginOAuth(platform: OauthProvider): Promise<User> {
    switch (platform) {
      case 'KAKAO':
        const {accessToken} = await KaKaoLogin.login();
        await this.loginMoA(accessToken, platform);
        break;
      case 'NAVER':
        const {isSuccess, successResponse} = await NaverLogin.login({
          appName: 'MoA',
          consumerKey: Config.NAVER_CLIENT_KEY!,
          consumerSecret: Config.NAVER_SECERT_KEY!,
          serviceUrlScheme:
            Platform.OS === 'ios'
              ? Config.NAVER_URL_SCHEME_IOS
              : Config.NAVER_URL_SCHEME_AOS,
        });
        if (isSuccess && successResponse) {
          await this.loginMoA(successResponse?.accessToken, platform);
        }
        break;
      case 'APPLE':
        const {authorizationCode} = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        if (authorizationCode) {
          await this.loginMoA(authorizationCode, platform);
        }
        break;
      default:
        throw new Error('유효하지않은 OAuth 플랫폼');
    }
    const user = await this.getUser();
    return user;
  }

  private async loginMoA(
    accessToken: string,
    platform: string,
  ): Promise<string> {
    try {
      const token = await this.apiClient
        .moaAuth(accessToken, platform)
        .then(async res => {
          await AsyncStorage.setItem('accessToken', res.data.accessToken);
          Axios.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return res.data.accessToken;
        });
      return token;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        case 409:
          error.response.data.message =
            '이미 존재하는 회원입니다. 가입하신 플랫폼으로 로그인해주세요.';
          throw error;
        default:
          throw error;
      }
    }
  }

  async getUser(): Promise<User> {
    try {
      const user = await this.apiClient.getUser();
      return user.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        case 401:
          Toast.show({type: 'error', text1: error.response.data.message});
          return error;
        case 404:
          Toast.show({type: 'error', text1: error.response.data.message});
          return error;
        default:
          Toast.show({type: 'error', text1: error.response.data.message});
          return error;
      }
    }
  }

  async updateUser({
    birthday,
    birthyear,
    nickname,
    profileImageUrl,
  }: Partial<User>) {
    try {
      const res = await this.apiClient.updateUser({
        nickname,
        birthday,
        birthyear,
        profileImageUrl,
      });
      return res.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async joinMoA(user: Partial<User>): Promise<string> {
    try {
      const res = await this.apiClient.signUp(user);
      return res.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async requestVerification(phoneNumber: string) {
    try {
      const requested = await this.apiClient.requestMobileVerification(
        phoneNumber,
      );
      return requested.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        case 403:
          error.response.data.message = '인증번호가 일치하지 않아요🥲';
          throw error;
        case 409:
          error.response.data.message = '이미 사용중인 번호예요🥲';
          throw error;
        default:
          throw error;
      }
    }
  }

  async verifyPhoneNumber(verificationNumber: string) {
    try {
      const res = await this.apiClient.verifyMobile(verificationNumber);
      return res.data;
    } catch (error: any) {
      console.log(error.response.data);
      switch (error.response.status) {
        case 409:
          error.response.data.message =
            '이미 사용중인 번호예요. 고객센터로 문의해주세요🙏🏻';
          throw error;
        default:
          throw error;
      }
    }
  }

  private async getPresignedUrl(fileName: string) {
    try {
      const url = await this.apiClient.getPresignedUrl(fileName);
      return url.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async updateProfileImage({
    imageBody,
    name,
  }: {
    imageBody: any;
    name: string;
  }): Promise<string> {
    try {
      const {presignedUrl} = await this.getPresignedUrl(name);
      const res = await fetch(presignedUrl, {
        method: 'PUT',
        body: imageBody,
      });
      const fileName = res.url.substring(
        res.url.indexOf('images/') + 7,
        res.url.indexOf('?'),
      );
      return `https://image.giftmoa.co.kr/images/${fileName}`;
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: '등록에 실패했어요. 다시 시도해주세요🥲',
      });
      throw error;
    }
  }
}
