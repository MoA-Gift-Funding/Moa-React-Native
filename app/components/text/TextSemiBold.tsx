import React from 'react';
import {Text} from 'react-native';

export default function TextSemiBold({
  style,
  title,
}: {
  style: string;
  title: string;
}) {
  return <Text className={`font-pretendard-semibold ${style}`}>{title}</Text>;
}
