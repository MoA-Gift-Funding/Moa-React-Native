import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import Login from './app/screens/Login/Login';
import BackHeader from './app/components/header/BackHeader';
import Join from './app/screens/Login/Join';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
