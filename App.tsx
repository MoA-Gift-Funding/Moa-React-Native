import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {UserContextProvider} from './app/contexts/UserContext';
import AuthRouter from './app/router/AuthRouter';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const App = () => {
  const queryClient = new QueryClient();

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NavigationContainer>
          <AuthRouter />
        </NavigationContainer>
      </UserContextProvider>
    </QueryClientProvider>
  );
};
