import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';
import {useCallback} from 'react';
import {Toast} from 'toastify-react-native';

type HttpStatus = number;
interface ServerResponse {
  message?: string;
}

const defaultHandler = (httpMessage: string = '에러가 발생했습니다.') => {
  Toast.error(httpMessage, 'top');
};

const handler409 = async (httpMessage: string = '에러가 발생했습니다.') => {
  Toast.error(httpMessage, 'top');
};

const handler400 = async (
  httpMessage: string = '에러가 발생했습니다. 재시도해주세요.',
) => {
  Toast.error(httpMessage, 'top');
  await AsyncStorage.clear();
};
const handler401to404 = async (
  httpMessage: string = '재로그인이 필요합니다. 다시 로그인해주세요.',
) => {
  Toast.error(httpMessage, 'top');
  await AsyncStorage.clear();
};

const handler500 = () => {
  Toast.error(
    '알 수 없는 문제가 발생하였습니다. 고객센터로 문의해주세요.',
    'top',
  );
};

const handlers: Record<HttpStatus | string, (str?: string) => void> = {
  default: defaultHandler,
  400: handler400,
  401: handler401to404,
  403: handler401to404,
  404: handler401to404,
  409: handler409,
  500: handler500,
};

const useApiError = () => {
  const handleError = useCallback((error: AxiosError<ServerResponse>) => {
    const httpStatus: HttpStatus | undefined = error.response?.status;
    const httpMessage: string | undefined = error.response?.data?.message;

    if (httpStatus && handlers[httpStatus]) {
      handlers[httpStatus](httpMessage);
      return;
    }

    handlers.default(httpMessage);
  }, []);

  return {handleError};
};
export default useApiError;
