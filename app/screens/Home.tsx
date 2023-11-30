import * as React from 'react';
import {Button, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import TextBold from '../components/text/TextBold';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoreMain from './store/StoreMain';

export default function Home({navigation}) {
  const {
    userState: {user},
  } = useUserContext();
  return <View />;
}
