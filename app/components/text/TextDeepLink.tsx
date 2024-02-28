import React from 'react';
import {Linking, Pressable} from 'react-native';
import TextSemiBold from './TextSemiBold';
import {throttle} from '../../utils/device';

const TextDeepLink = ({
  url,
  text,
  style,
}: {
  url: string;
  text: string;
  style?: string;
}) => {
  return (
    <Pressable onPress={throttle(async () => await Linking.openURL(url), 1000)}>
      <TextSemiBold title={text} style={style} />
    </Pressable>
  );
};

export default TextDeepLink;
