import React, {useEffect, useState} from 'react';
import {Animated, Easing, View} from 'react-native';

const LoadingBar = () => {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnimation]);
  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View className="absolute top-1/4 w-full z-10">
      <Animated.View
        style={{transform: [{rotate: interpolateRotating}]}}
        className="w-24 h-24 border-Gray-01 border-b-Main-01 border-[14px] bg-transparent rounded-full mx-auto"
      />
    </View>
  );
};

export default LoadingBar;
