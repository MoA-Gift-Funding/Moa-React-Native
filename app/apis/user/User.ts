import * as KaKaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {Axios} from '../axios.config';
import Config from 'react-native-config';
import {OauthProvider, User} from '../../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import appleAuth from '@invertase/react-native-apple-authentication';
import {UserHttpClient} from './UserHttpClient';
import {UserFakeClient} from './UserfakeClient';

export class Users {
  constructor(private readonly apiClient: UserHttpClient | UserFakeClient) {
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
      console.error(error.response);
      switch (error.response.status) {
        case 409:
          error.response.data.message =
            '이미 존재하는 회원입니다. 가입하신 플랫폼으로 로그인해주세요.';
          return error;
        default:
          return error;
      }
    }
  }

  async getUser(): Promise<User> {
    try {
      const user = await this.apiClient.getUser();
      return user.data;
    } catch (error: any) {
      console.error(error.response.data);
      await AsyncStorage.clear();
      switch (error.response.status) {
        case 401:
          error.response.data.message =
            '세션이 만료되었습니다. 재로그인이 필요합니다.';
          return error;
        case 404:
          error.response.data.message =
            '세션이 만료되었습니다. 재로그인이 필요합니다.';
          return error;
        default:
          return error;
      }
    }
  }
}

export const joinMoA = async (user: Partial<User>) => {
  try {
    const res = await Axios.post('/members', user);
    console.log(res.data);
    return 'created';
  } catch (error) {
    console.log(error);
  }
};

export const getPresignedUrl = async (fileName: string) => {
  try {
    const url = await Axios.post('/infra/aws/s3/presigned-url', {
      fileName,
    }).then(res => res.data);
    return url;
  } catch (error) {
    console.log(error.response);
  }
};

export const updateProfileImage = async ({
  imageBody,
  name,
}: {
  imageBody: any;
  name: string;
}) => {
  try {
    const {presignedUrl} = await getPresignedUrl(name);
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
    console.log(error.response.data);

    return '다시 시도해주세요.';
  }
};

export const updateUser = async ({
  birthday,
  birthyear,
  nickname,
  profileImageUrl,
}: Partial<User>): Promise<User> => {
  try {
    const user = await Axios.put('/members', {
      nickname,
      birthday,
      birthyear,
      profileImageUrl,
    }).then(() => {
      const updated = getUser();
      return updated;
    });
    return user;
  } catch (error: any) {
    console.error(error.response);
    switch (error.response.status) {
      case 401:
        await AsyncStorage.clear();
        throw new Error('세션이 만료되었습니다. 재로그인이 필요합니다.');
      case 404:
        await AsyncStorage.clear();
        throw new Error('유효하지 않은 회원입니다. 재로그인이 필요합니다.');
      default:
        throw new Error('네트워크 에러가 발생했습니다. 다시 시도해주세요.');
    }
  }
};
