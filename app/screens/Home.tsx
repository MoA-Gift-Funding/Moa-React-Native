import * as React from 'react';
import {Button, View} from 'react-native';

export default function Home({navigation}) {
  return (
    <View>
      <Button title="로그인" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
