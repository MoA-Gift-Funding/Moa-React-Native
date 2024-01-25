import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {UserContextProvider} from './app/contexts/UserContext';
import AuthRouter from './app/router/AuthRouter';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {ProductContextProvider} from './app/contexts/APIContext';
import useApiError from './app/hooks/useApiError';

export const App = () => {
  const {handleError} = useApiError();
  const queryClient = new QueryClient({
    defaultOptions: {mutations: {onError: handleError}},
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
            <AuthRouter />
          </NavigationContainer>
        </ProductContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
};
