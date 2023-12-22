import React from 'react';
import {Text} from 'react-native';

export default function TextRegular({
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
      className={`font-pretendard-regular ${style}`}
      numberOfLines={numberOfLines}>
      {title}
    </Text>
  );
}
