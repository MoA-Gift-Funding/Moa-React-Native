import React from 'react';
import {Pressable, View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import TextBold from '../../../components/text/TextBold';

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
      className="flex flex-col justify-center items-center"
      onPress={onPress}>
      <TextBold title={dataLength.toString()} style="text-Heading-4" />
      <TextRegular title={title} style="text-Body-2 text-Gray-06" />
    </Pressable>
  );
};

export default MenuCategoryTop;
