import React from 'react';
import {SafeAreaView, View} from 'react-native';

export default function BlankHeader() {
  return (
    <SafeAreaView>
      <View className="h-[48px] flex justify-center items-start bg-white" />
    </SafeAreaView>
  );
}
