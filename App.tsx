import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import {UserContextProvider} from './app/contexts/UserContext';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AuthRouter from './app/router/AuthRouter';
import messaging from '@react-native-firebase/messaging';
import useApiError from './app/hooks/handlers/useApiError';
import {ErrorBoundary} from 'react-error-boundary';
import FallbackUI from './app/components/handlers/fallbackUI';
import Toast from 'react-native-toast-message';
import notifee, {AndroidImportance} from '@notifee/react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  getPathname,
  handleDynamicLink,
  updateAppVersion,
} from './app/utils/device';

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
  const appVersionCheck = React.useCallback(() => updateAppVersion(), []);

  React.useEffect(() => {
    const foreGroundMessage = async (title, body) => {
      await notifee.requestPermission();

      const channelId = await notifee.createChannel({
        id: 'MoA',
        name: '모아',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          pressAction: {
            id: 'MoA',
          },
        },
      });
    };
    // 추후 테스트후 변경할 것
    // notifee.onForegroundEvent(({type, detail}) => {
    //   const {
    //     notification: {title, body},
    //   } = detail;
    //   switch (type) {
    //     case EventType.PRESS:
    //       console.log('User pressed notification', detail.notification);
    //       break;
    //   }
    // });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const {
        notification: {body, title},
        data,
      } = remoteMessage;
      foreGroundMessage(title, body);
    });

    const unsubscribe2 = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    // return () => unsubscribe();

    // 앱 배포 URL 적용 후, 코드 활성화 예정
    // appVersionCheck();

    SplashScreen.hide();

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
