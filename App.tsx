import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import {UserContextProvider} from './app/contexts/UserContext';
import AuthRouter from './app/router/AuthRouter';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {ProductContextProvider} from './app/contexts/APIContext';
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
      },
    },
    queryCache: new QueryCache({
      onError: handleError,
    }),
  });

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ProductContextProvider>
          <NavigationContainer>
            <QueryErrorResetBoundary>
              {({reset}) => (
                <ErrorBoundary onReset={reset} FallbackComponent={FallbackUI}>
                  <AuthRouter />
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          </NavigationContainer>
          <Toast />
        </ProductContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
};
