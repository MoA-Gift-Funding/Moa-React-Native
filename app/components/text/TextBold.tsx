import React from 'react';
import {Text} from 'react-native';

export default function TextBold({
  style,
  title,
}: {
  style: string;
  title: string;
}) {
  console.log(style);

  return <Text className={`font-pretendard-bold ${style}`}>{title}</Text>;
}
