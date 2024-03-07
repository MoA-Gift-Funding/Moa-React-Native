import React from 'react';
import {Image, Pressable} from 'react-native';
import TextRegular from '../text/TextRegular';
import {useNavigation} from '@react-navigation/native';

const CategoryIcon = ({
  uri,
  title,
  category,
}: {
  uri: string;
  title: string;
  category?:
    | '상품권'
    | '피자/치킨'
    | '뷰티'
    | '식품/건강'
    | '편의점'
    | '리빙/잡화'
    | '영화'
    | undefined;
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      className="flex flex-col justify-center items-center"
      onPress={() =>
        navigation.navigate('ProductCategorizedListScreen', {
          headerTitle: title,
          category,
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
