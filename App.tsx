import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {UserContextProvider} from './app/contexts/UserContext';
import AuthRouter from './app/router/AuthRouter';

export const App = () => {
  const queryClient = new QueryClient();

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
