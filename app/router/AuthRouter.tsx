import React from 'react';
import {useUserContext} from '../contexts/UserContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Login/Login';
import BackHeader from '../components/header/BackHeader';
import PhoneValidation from '../screens/Login/PhoneValidation';
import Profile from '../screens/Login/Profile';
import Contact from '../screens/Login/Contact';
import JoinCompleted from '../screens/Login/JoinCompleted';
import Join from '../screens/Login/Join';

const AuthRouter = () => {
  const {
    userState: {user},
  } = useUserContext();
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      {user?.level === 'REGULAR_MEMBER' ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => <BackHeader />,
          }}
        />
      ) : (
        <>
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
            name="Contact"
            component={Contact}
            options={{
              header: () => <BackHeader />,
            }}
          />
          <Stack.Screen
            name="JoinCompleted"
            component={JoinCompleted}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthRouter;
