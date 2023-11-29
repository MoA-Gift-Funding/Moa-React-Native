import * as KaKaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {Axios} from '../axios.config';
import Config from 'react-native-config';
import {User, UserFormData} from '../../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginKakao = async (): Promise<User> => {
  try {
    const {accessToken} = await KaKaoLogin.login();
    const user = await loginMoA(accessToken, 'kakao');
    return user;
  } catch (error) {
    console.log(error.response);
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
    console.log(successResponse);

    const user = await loginMoA(successResponse.accessToken, 'naver');
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('[ERROR] Network Error');
  }
};

const loginMoA = async (
  accessToken: string,
  platform: string,
): Promise<User> => {
  try {
    const user = await Axios.get(
      `/users/login/oauth2/${platform}/app/${accessToken}`,
    ).then(async res => {
      await saveCookie(res);
      await AsyncStorage.setItem('accessToken', res.data.data.accessToken);
      Axios.defaults.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
      return res.data.data;
    });
    return user;
  } catch (error) {
    console.error(error);
    console.log(error.response);
    console.log('여기서나는건가??/');

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
    const user = await Axios.post('/users/update-new-user-info', {
      nickname,
      phoneNumber,
      birthday,
      birthyear,
    })
      .then(res => {
        const user = res.data.data;
        return user;
      })
      .catch(error => {
        console.error(error);
      });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('[ERROR] Network Error');
  }
};

export const getUser = async () => {
  const found = {user: null, message: ''};
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    Axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    await Axios.get('/users/get-user-info')
      .then(res => {
        found.user = res.data.data;
        return;
      })
      .catch(error => {
        console.log(error.response);
      });
    return found;
  } catch (error) {
    console.error(error);
    console.log(error.response);
  }
};

const saveCookie = async res => {
  const [cookie] = res.headers['set-cookie'];
  const refresh = JSON.stringify(cookie).substring(8);
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

export const updateProfileImage = async (profileImage: string) => {
  try {
    await Axios.post('/users/update-profile-image', {profileImage})
      .then(res => {
        console.log(res.data);
      })
      .catch(console.error);
  } catch (error) {
    console.log(error);
    return '다시 시도해주세요.';
  }
};
