import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import {UserContextProvider} from './app/contexts/UserContext';
import AuthRouter from './app/router/AuthRouter';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import useApiError from './app/hooks/useApiError';
import {ErrorBoundary} from 'react-error-boundary';
import FallbackUI from './app/apis/fallbackUI';
import Toast from 'react-native-toast-message';

export const App = () => {
  const {handleError} = useApiError();
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {onError: handleError},
      queries: {
        throwOnError: true,
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: handleError,
    }),
  });
  const {reset} = useQueryErrorResetBoundary();

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ErrorBoundary onReset={reset} FallbackComponent={FallbackUI}>
          <UserContextProvider>
            <AuthRouter />
          </UserContextProvider>
        </ErrorBoundary>
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
};
