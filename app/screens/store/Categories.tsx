import React from 'react';
import CategoryIcon from '../../components/button/CategoryIcon';
import {View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getCategories} from '../../apis/store/Store';

const Categories = () => {
  const {data: categories} = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <>
      <View className="flex flex-row flex-wrap justify-center gap-2">
        {categories?.map((category, index) => (
          <View key={index}>
            <CategoryIcon title={category.name} uri={category.image} />
          </View>
        ))}
      </View>
    </>
  );
};

export default Categories;
