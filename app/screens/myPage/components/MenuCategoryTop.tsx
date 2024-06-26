import React from 'react';
import {Pressable} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import TextBold from '../../../components/text/TextBold';
import {throttle} from '../../../utils/device';

const MenuCategoryTop = ({
  dataLength,
  title,
  onPress,
}: {
  dataLength: number;
  title: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      className="flex flex-col justify-center items-center px-6"
      onPress={throttle(onPress, 1000)}>
      <TextBold title={dataLength.toString()} style="text-Heading-4" />
      <TextRegular title={title} style="text-Body-2 text-Gray-06" />
    </Pressable>
  );
};

export default MenuCategoryTop;
