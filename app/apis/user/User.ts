import * as KaKaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {Axios} from '../axios.config';
import Config from 'react-native-config';
import {User, UserFormData} from '../../types/User';

export const loginKakao = async (): Promise<User> => {
  try {
    const {accessToken} = await KaKaoLogin.login();
    const user = await loginMoA(accessToken, 'kakao');
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('[ERROR] Network Error');
  }
};

export const loginNaver = async (): Promise<User> => {
  try {
    const {isSuccess, successResponse, failureResponse} =
      await NaverLogin.login({
        appName: 'MoA',
        consumerKey: Config.NAVER_CLIENT_KEY!,
        consumerSecret: Config.NAVER_SECERT_KEY!,
        serviceUrlScheme: Config.NAVER_URL_SCHEME,
      });
    if (!isSuccess) {
      throw new Error(failureResponse?.message);
    }
    const user = loginMoA(successResponse.accessToken, 'naver');
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('[ERROR] Network Error');
  }
};

const loginMoA = (accessToken: string, platform: string): Promise<User> => {
  try {
    const user = Axios.get(
      `/users/login/oauth2/${platform}/app/${accessToken}`,
    ).then(res => {
      return res.data.data;
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('[ERROR] Network Error');
  }
};

export const updateUser = async ({
  birthday,
  birthyear,
  nickname,
  phoneNumber,
}: UserFormData): Promise<User> => {
  try {
    // api 호출 await
    console.log(birthday, birthyear, nickname, phoneNumber);
    return {
      accessToken:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMyIsImlhdCI6MTcwMDc4MDc1MiwiZXhwIjoxNzAwNzg3OTUyfQ.cDq-or_sFVK2vQo2qGEdaen6THBhbLeG-LRe50Zyy8EmY3h6va7MuD1vwrzWKpLPODOPFipDJPBRn0PY0HaClg',
      birthday: '0520',
      birthyear: '1993',
      email: 'sue930520@naver.com',
      level: 'ASSOCICATE_MEMBER',
      nickname: '진',
      phoneNumber: '010-4558-9598',
      profileImage:
        'http://k.kakaocdn.net/dn/baMsiI/btsyXW46JXQ/205Yun5FFlqLWmOIB7NqT0/img_640x640.jpg',
    };
  } catch (error) {
    console.error(error);
    throw new Error('[ERROR] Network Error');
  }
};
