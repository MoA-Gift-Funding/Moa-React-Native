import React from 'react';
import {Image, Pressable} from 'react-native';
import TextRegular from '../text/TextRegular';
import {useNavigation} from '@react-navigation/native';

const CategoryIcon = ({
  uri,
  title,
  categoryType,
}: {
  uri: string;
  title: string;
  categoryType: string;
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      className="flex flex-col justify-center items-center"
      onPress={() =>
        navigation.navigate('ItemList', {
          headerTitle: title,
          search: true,
          categoryType,
        })
      }>
      <Image
        className="w-[72px] h-[72px]"
        source={{
          uri,
        }}
      />
      <TextRegular title={title} style="text-Detail-1" />
    </Pressable>
  );
};

export default CategoryIcon;
