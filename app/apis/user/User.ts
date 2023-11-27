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
    const accessToken = await AsyncStorage.getItem('accessToken');
    Axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    const user = await Axios.post('/users/update-new-user-info', {
      nickname,
      phoneNumber,
      birthday,
      birthyear,
    })
      .then(async res => {
        console.log(res.data);
        // 추후 데이터 받아서 바로 리턴하는 것으로 변경
        const {user} = await getUser();
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

const getUser = async () => {
  const found = {user: null, message: ''};
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    await Axios.get('/users/get-user-info', {
      headers: {Authorization: accessToken},
    })
      .then(res => (found.user = res.data.data))
      .catch(error => {
        console.log(error);
        const message = error.response.data.message;
        switch (message) {
          case 'Unauthorized':
            // accessToken 재발급 로직
            break;
          default:
            found.message = '로그인이 만료되었습니다. 재로그인해주세요.';
        }
      });
    return found;
  } catch (error) {
    console.error(error);
  }
};
