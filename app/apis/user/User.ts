import * as KaKaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {Axios} from '../axios.config';
import Config from 'react-native-config';

export const loginKakao = () => {
  return KaKaoLogin.login()
    .then(res => {
      const {accessToken} = res;
      return loginMoA(accessToken, 'kakao');
    })
    .then(res => {
      console.log(res);
    })
    .catch(console.error);
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

const loginMoA = (accessToken: string, platform: string) => {
  Axios.get(`/users/login/oauth2/${platform}/app/${accessToken}`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(error => {
      console.log(error);
    });
};
