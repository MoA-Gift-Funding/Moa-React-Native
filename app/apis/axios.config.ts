import axios from 'axios';
import Config from 'react-native-config';
import {refreshAccessToken, refreshRefreshToken} from './user/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Axios = axios.create({
  baseURL: Config.BASE_URL,
});

// Axios.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2));
//   return request;
// });

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  // async error => {
  // console.log('인터셉터 진입');
  // console.log('인터셉터 에러: ', error.response);
  // const accessToken = await refreshAccessToken();
  // console.log('[accessToken 발급 됐나요???]: ', accessToken);
  // error.config.headers = {
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${accessToken}`,
  // };
  // const response = await Axios.request(error.config);
  // return response;
  // if (error.response.data.message === 'Unauthorized') {
  //   let accessToken;
  //   try {
  //     accessToken = await refreshAccessToken();
  //   } catch (err) {
  //     if (err.response.status === 401) {
  //       await refreshRefreshToken().catch(async lastErr => {
  //         return await AsyncStorage.clear();
  //       });
  //     }
  //   }
  //   error.config.headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   };
  //   const response = await Axios.request(error.config);
  //   return response;
  // }
  // return Promise.reject(error);
  // },
);
