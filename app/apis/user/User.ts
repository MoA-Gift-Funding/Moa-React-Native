import * as KaKaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {Axios} from '../axios.config';
import Config from 'react-native-config';
import {User, UserFormData} from '../../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import appleAuth from '@invertase/react-native-apple-authentication';

export const loginKakao = async (): Promise<User> => {
  try {
    const {accessToken} = await KaKaoLogin.login();
    const moaToken = await loginMoA(accessToken, 'KAKAO');
    const user = await getUser(moaToken);
    return user;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    throw new Error('[ERROR] Network Error');
  }
};

export const loginApple = async (): Promise<User> => {
  try {
    const {authorizationCode} = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    if (!authorizationCode) {
      throw new Error('[ERROR] Network Error');
    }
    const moaToken = await loginMoA(authorizationCode, 'APPLE');
    const user = await getUser(moaToken);
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
    const user = await loginMoA(successResponse.accessToken, 'NAVER');
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('[ERROR] Network Error');
  }
};

const loginMoA = async (
  accessToken: string,
  platform: string,
): Promise<string> => {
  try {
    const user = await Axios.get(
      `/oauth/login/app/${platform}/${accessToken}`,
    ).then(async res => {
      await AsyncStorage.setItem('accessToken', res.data.accessToken);
      Axios.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return res.data.accessToken;
    });
    return user;
  } catch (error) {
    console.error(error);
    console.log(error);

    console.log(error.response.data);
    const {message} = error.response.data;
    switch (message) {
      case 'Member that already exists':
        Alert.alert(
          '',
          '이미 가입 정보가 있는 회원입니다. 가입하신 플랫폼으로 로그인해주세요.',
        );
        break;
      case 'Member deleted':
        Alert.alert('', '탈퇴한 회원은 가입이 불가합니다.');
        break;
      default:
        Alert.alert('', '에러가 발생했습니다. 고객 센터로 문의해주세요.');
    }
    throw new Error('[ERROR] Network Error');
  }
};

export const updateUser = async ({
  birthday,
  birthyear,
  nickname,
}: UserFormData): Promise<User> => {
  try {
    const user = await Axios.put('/members', {
      nickname,
      birthday,
      birthyear,
    })
      .then(res => {
        const updated = getUser();
        return updated;
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

export const updateUserProfile = async ({
  birthday,
  birthyear,
  nickname,
}: {
  birthday: string;
  birthyear: string;
  nickname: string;
}) => {
  try {
    const user = await Axios.post('/users/update-user-info/1', {
      nickname,
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

export const getUser = async (token?: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('겟유저 accessToken', accessToken);
    Axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    const res = await Axios.get('/members/my');
    const user = res.data;
    console.log('겟유저', user);

    return user;
  } catch (error) {
    console.log('에러 들어옴');
    console.log('error: ', error);
    console.error(error);
    console.log(error.response);
    // 추후 삭제
    await AsyncStorage.clear();
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
