import React from 'react';
import {Text} from 'react-native';

export default function TextBold({
  style,
  title,
  numberOfLines,
}: {
  style: string;
  title?: string;
  numberOfLines?: number;
}) {
  return (
    <Text
      className={`font-pretendard-bold ${style}`}
      numberOfLines={numberOfLines}>
      {title}
    </Text>
  );
}
