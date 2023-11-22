import * as KaKaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {Axios} from '../axios.config';
import Config from 'react-native-config';
import {User} from '../../types/User';

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

export const loginNaver = () => {
  return NaverLogin.login({
    appName: 'com.runko.moa',
    consumerKey: 'tgVYPuyq9UBfLdGH8pIs',
    consumerSecret: '8lz3sPz4kv',
    serviceUrlScheme: Config.NAVER_URL_SCHEME,
  })
    .then(res => {
      return loginMoA(res.successResponse.accessToken, 'naver');
    })
    .catch(error => {
      console.log(error);
    });
};

const loginMoA = (accessToken: string, platform: string): Promise<User> => {
  try {
    const user = Axios.get(
      `/users/login/oauth2/${platform}/app/${accessToken}`,
    ).then(res => {
      console.log(JSON.stringify(res.data));
      return res.data.data;
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('[ERROR] Network Error');
  }
};
