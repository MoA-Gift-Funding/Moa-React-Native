import React from 'react';
import {Text} from 'react-native';

export default function TextRegular({
  style,
  title,
}: {
  style: string;
  title?: string;
}) {
  return <Text className={`font-pretendard-regular ${style}`}>{title}</Text>;
}
