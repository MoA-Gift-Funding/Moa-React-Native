import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoadingBar = () => {
  return (
    <View className="absolute top-1/4 w-full z-10">
      <ActivityIndicator size="large" color="#FF5414" />
    </View>
  );
};

export default LoadingBar;
