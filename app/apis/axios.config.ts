import axios from 'axios';
import Config from 'react-native-config';
import {refreshAccessToken, refreshRefreshToken} from './user/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Axios = axios.create({
  baseURL: Config.BASE_URL,
});

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async error => {
    // console.log(error);
    // console.log(error.response);
    // if (error.response.status === 401) {
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
    return Promise.reject(error);
  },
);
