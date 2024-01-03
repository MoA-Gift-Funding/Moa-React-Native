import React from 'react';
import {Pressable} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';

const MenuCategory = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      className="h-[64px] flex justify-center px-8 border-b-2 border-Gray-01"
      onPress={onPress}>
      <TextRegular title={title} style="text-Body-1" />
    </Pressable>
  );
};

export default MenuCategory;
