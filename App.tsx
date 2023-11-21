import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Header from './app/components/header/Header';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => <Header title="main" />,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: () => <Header title="main" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
