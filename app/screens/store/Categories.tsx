import React from 'react';
import CategoryIcon from '../../components/button/CategoryIcon';
import {View} from 'react-native';
import useProducts from '../../hooks/useProducts';

const Categories = () => {
  const {
    categoriesQuery: {data: categories},
  } = useProducts();

  const cgTyper = (name: string) => {
    let type;
    switch (name) {
      case '교환권':
        type = 'VOUCHER';
        break;
      case '상품권':
        type = 'TICKET';
        break;
      case '럭셔리':
        type = 'LUXURY';
        break;
      case '테크':
        type = 'TECH';
        break;
      case '패션':
        type = 'FASHION';
        break;
      case '뷰티':
        type = 'BEAUTY';
        break;
      case '가구/리빙':
        type = 'LIVING';
        break;
      case '랭킹':
        type = 'RANKING';
        break;
      default:
        type = 'UNKNOWN';
    }
    return type;
  };

  return (
    <>
      <View className="flex flex-row flex-wrap justify-center gap-2">
        {categories?.map(category => (
          <View key={category.id + category.name}>
            <CategoryIcon
              title={category.name}
              uri={category.image}
              categoryType={cgTyper(category.name)}
            />
          </View>
        ))}
      </View>
    </>
  );
};

export default Categories;
