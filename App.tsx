import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import Login from './app/screens/Login/Login';
import BackHeader from './app/components/header/BackHeader';
import Join from './app/screens/Login/Join';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {UserContextProvider} from './app/contexts/UserContext';
import PhoneValidation from './app/screens/Login/PhoneValidation';
import Profile from './app/screens/Login/Profile';
import Contacts from './app/screens/Login/Contacts';

const Stack = createNativeStackNavigator();

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                header: () => <BackHeader />,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                header: () => <BackHeader />,
              }}
            />
            <Stack.Screen
              name="Join"
              component={Join}
              options={{
                header: () => <BackHeader />,
              }}
            />
            <Stack.Screen
              name="PhoneValidation"
              component={PhoneValidation}
              options={{
                header: () => <BackHeader />,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                header: () => <BackHeader />,
              }}
            />
            <Stack.Screen
              name="Contacts"
              component={Contacts}
              options={{
                header: () => <BackHeader />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </QueryClientProvider>
  );
};
