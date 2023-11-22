import axios from 'axios';
import Config from 'react-native-config';

export const Axios = axios.create({
  baseURL: Config.BASE_URL,
});
