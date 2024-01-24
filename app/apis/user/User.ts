import * as KaKaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {Axios} from '../axios.config';
import Config from 'react-native-config';
import {User} from '../../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import appleAuth from '@invertase/react-native-apple-authentication';
import axios from 'axios';

export const loginKakao = async (): Promise<User> => {
  try {
    const {accessToken} = await KaKaoLogin.login();
    await loginMoA(accessToken, 'KAKAO');
    const user = await getUser();
    console.log(user);

    return user;
  } catch (error: any) {
    console.log('KAKAO 인증에러 발생: ', error.response);
    throw new Error('KAKAO 인증에러 발생');
  }
};

export const loginApple = async (): Promise<User> => {
  try {
    const {authorizationCode} = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    if (!authorizationCode) {
      throw new Error('APPLE 인증에러 발생: ');
    }
    await loginMoA(authorizationCode, 'APPLE');
    const user = await getUser();
    return user;
  } catch (error: any) {
    console.log(error.response.message, error.response);
    throw new Error('APPLE 인증에러 발생');
  }
};

export const loginNaver = async (): Promise<User> => {
  try {
    const {isSuccess, successResponse, failureResponse} =
      await NaverLogin.login({
        appName: 'MoA',
        consumerKey: Config.NAVER_CLIENT_KEY!,
        consumerSecret: Config.NAVER_SECERT_KEY!,
        serviceUrlScheme:
          Platform.OS === 'ios'
            ? Config.NAVER_URL_SCHEME_IOS
            : Config.NAVER_URL_SCHEME_AOS,
      });
    if (!isSuccess || !successResponse) {
      throw new Error(failureResponse?.message);
    }
    await loginMoA(successResponse.accessToken, 'NAVER');
    const user = await getUser();
    return user;
  } catch (error: any) {
    console.log('NAVER 인증에러 발생: ', error.response);
    throw new Error('NAVER 인증에러 발생');
  }
};

const loginMoA = async (
  accessToken: string,
  platform: string,
): Promise<string> => {
  try {
    const token = await Axios.get(`/oauth/login/app/${platform}`, {
      headers: {OAuthAccessToken: accessToken},
    }).then(async res => {
      await AsyncStorage.setItem('accessToken', res.data.accessToken);
      Axios.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return res.data.accessToken;
    });
    return token;
  } catch (error: any) {
    console.error(error.response);
    switch (error.response.status) {
      case 409:
        throw new Error(
          '이미 존재하는 회원입니다. 가입하신 플랫폼으로 로그인해주세요.',
        );
      default:
        throw new Error('네트워크 에러가 발생했습니다. 다시 시도해주세요.');
    }
  }
};

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
    console.log(res);

    await axios
      .put(presignedUrl, imageBody, {headers: {'Content-Type': 'image/jpeg'}})
      .then(res => {
        console.log(res.data);
      });
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

export const getUser = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    Axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    const res = await Axios.get('/members/my');
    const user = res.data;
    return user;
  } catch (error: any) {
    console.error(error);
    await AsyncStorage.clear();
    switch (error.response.status) {
      case 401:
        throw new Error('세션이 만료되었습니다. 재로그인이 필요합니다.');
      case 404:
        throw new Error('유효하지 않은 회원입니다. 재로그인이 필요합니다.');
      default:
        throw new Error('네트워크 에러가 발생했습니다. 다시 시도해주세요.');
    }
  }
};

const saveCookie = async res => {
  const [cookie] = res.headers['set-cookie'];
  const jwt = JSON.stringify(cookie);
  const refresh = jwt.substring(9, jwt.indexOf(';'));
  await AsyncStorage.setItem('refresh', refresh);
  return refresh;
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refresh');
    const res = await Axios.post('/tokens/reissue-access-token', {
      refreshToken,
    });
    const accessToken = res.data.data.accessToken;
    await AsyncStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error(error);
    const message = error.response.data.message;
    if (message === 'Unauthorized') {
      return 'Refresh Token Expired';
    }
  }
};

export const refreshRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refresh');
    await Axios.post('/tokens/reissue-access-token', {
      refreshToken,
    })
      .then(async res => await saveCookie(res))
      .catch(console.error);
  } catch (error) {
    console.error(error);
    const message = error.response.data.message;
    if (message === 'Unauthorized') {
      return '[ERROR] 재로그인 필요';
    }
  }
};
