import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlankHeader from '../components/header/BlankHeader';
import StoreMain from '../screens/store/StoreMain';
import StoreHeader from '../components/header/StoreHeader';
import ItemDetail from '../screens/store/ItemDetail';

const AuthRouter = () => {
  const {
    userState: {user},
  } = useUserContext();
  const Stack = createNativeStackNavigator();
  const [process, setProcess] = useState<string | null>(null);
  useEffect(() => {
    const getProcess = async () => {
      const now = await AsyncStorage.getItem('process');
      setProcess(now);
    };
    getProcess();
  }, [user?.joinProcess]);

  return (
    <Stack.Navigator>
      {user?.level === 'REGULAR_MEMBER' && !process ? (
        <>
          <Stack.Screen
            name="StoreMain"
            component={StoreMain}
            options={{header: () => <StoreHeader />}}
          />
          <Stack.Screen
            name="ItemDetail"
            component={ItemDetail}
            options={{header: () => <BackHeader />}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => <BackHeader />,
            }}
          />
        </>
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
            options={{
              header: () => <BlankHeader />,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthRouter;
