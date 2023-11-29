import * as React from 'react';
import {Button, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import TextBold from '../components/text/TextBold';

export default function Home({navigation}) {
  const {
    userState: {user},
  } = useUserContext();

  return (
    <View>
      {user && (
        <TextBold
          title={`${user?.nickname}님은 로그인된 상태입니다.`}
          style="text-Body-2"
        />
      )}
      {!user && (
        <Button title="로그인" onPress={() => navigation.navigate('Login')} />
      )}
    </View>
  );
}
