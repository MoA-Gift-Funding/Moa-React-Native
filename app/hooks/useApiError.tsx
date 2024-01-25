import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';
import {useCallback} from 'react';
import Toast from 'react-native-toast-message';
type HttpStatus = number;
interface ServerResponse {
  message?: string;
}

const defaultHandler = (httpMessage: string = '에러가 발생했습니다.') => {
  Toast.show({type: 'error', text1: httpMessage});
};

const handler409 = async (httpMessage: string = '에러가 발생했습니다.') => {
  Toast.show({type: 'error', text1: httpMessage});
};

const handler400 = async (
  httpMessage: string = '에러가 발생했습니다. 재시도해주세요.',
) => {
  Toast.show({type: 'error', text1: httpMessage});
  await AsyncStorage.clear();
};
const handler401to404 = async (
  httpMessage: string = '재로그인이 필요합니다. 다시 로그인해주세요.',
) => {
  Toast.show({type: 'error', text1: httpMessage});
  await AsyncStorage.clear();
};

const handler500 = () => {
  Toast.show({
    type: 'error',
    text1: '알 수 없는 문제가 발생했습니다.',
  });
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
  const handleError = useCallback(
    (error: AxiosError<ServerResponse> | Error) => {
      if (error instanceof AxiosError) {
        const httpStatus: HttpStatus | undefined = error.response?.status;
        const httpMessage: string | undefined = error.response?.data?.message;

        if (httpStatus && handlers[httpStatus]) {
          handlers[httpStatus](httpMessage);
        }

        handlers.default(httpMessage);
      }
    },
    [],
  );

  return {handleError};
};
export default useApiError;
