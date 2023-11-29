import axios from 'axios';
import Config from 'react-native-config';
import {refreshAccessToken, refreshRefreshToken} from './user/User';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Axios = axios.create({
  baseURL: Config.BASE_URL,
});

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async error => {
    console.log(error);
    if (error.response.status === 401) {
      console.log('intercepted');
      const accessToken = await refreshAccessToken();
      console.log(accessToken);
      error.config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  },
);
