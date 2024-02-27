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
            '이미 가입된 회원이예요. 가입하신 플랫폼으로 로그인해주세요🙏🏻';
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
        case 404:
          error.response.data.message =
            '회원 정보를 찾을 수 없어요. 다시 로그인해주세요🥲';
          throw error;
        default:
          throw error;
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
          error.response.data.message =
            '이미 가입된 번호예요. 가입하신 플랫폼으로 로그인해주세요🙏🏻';
          throw error;
        case 500:
          error.response.data.message =
            '정상적으로 처리되지 않았어요. 다시 시도해주세요🙏🏻';
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
        case 400:
          error.response.data.message =
            '인증시간이 만료되었어요. 인증을 다시 시도해주세요🙏🏻';
          throw error;
        case 401:
          error.response.data.message = '인증번호가 일치하지 않아요🥲';
          throw error;
        case 409:
          error.response.data.message =
            '이미 가입된 번호예요. 가입하신 플랫폼으로 로그인해주세요🙏🏻';
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
      const {presignedUrl, fileName} = await this.getPresignedUrl(name);
      await fetch(presignedUrl, {
        method: 'PUT',
        body: imageBody,
      });
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

  async deactivateUser(accessToken: string) {
    try {
      const deactivated = await this.apiClient.deactivateUser(accessToken);
      return deactivated.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        default:
          throw error;
      }
    }
  }
}
