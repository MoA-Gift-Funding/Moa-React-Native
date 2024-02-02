import React from 'react';
import {Linking, Pressable} from 'react-native';
import TextSemiBold from './TextSemiBold';

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
    <Pressable
      onPress={async () => {
        await Linking.openURL(url);
      }}>
      <TextSemiBold title={text} style={style} />
    </Pressable>
  );
};

export default TextDeepLink;
