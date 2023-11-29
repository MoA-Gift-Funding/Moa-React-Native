import React from 'react';
import {View} from 'react-native';

const ProgressBar = ({progress}) => {
  return (
    <View className="w-full bg-Gray-01 rounded-full h-3 mt-2">
      <View className={`bg-Main-01 h-3 rounded-full ${progress}`} />
    </View>
  );
};

export default ProgressBar;
