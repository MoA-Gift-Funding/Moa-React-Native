import React from 'react';
import CategoryIcon from '../../components/button/CategoryIcon';
import {View} from 'react-native';

const Categories = () => {
  return (
    <>
      <View className="flex flex-row flex-wrap justify-center gap-2">
        <View>
          <CategoryIcon
            title="상품권"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321722/moa-giftCard_lst6kc.png"
            category="상품권"
          />
        </View>
        <View>
          <CategoryIcon
            title="영화"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1709355154/moa-%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%92%E1%85%AA_xd2qbr.png"
            category="영화"
          />
        </View>
        <View>
          <CategoryIcon
            title="피자/치킨"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1709355155/moa-%E1%84%8E%E1%85%B5%E1%84%8F%E1%85%B5%E1%86%AB_yvjypk.png"
            category="피자/치킨"
          />
        </View>

        <View>
          <CategoryIcon
            title="리빙/잡화"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321721/moa-living_fksudz.png"
            category="리빙/잡화"
          />
        </View>

        <View>
          <CategoryIcon
            title="편의점"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1709355155/moa-%E1%84%91%E1%85%A7%E1%86%AB%E1%84%8B%E1%85%B4%E1%84%8C%E1%85%A5%E1%86%B7_pdc0ge.png"
            category="편의점"
          />
        </View>
        <View>
          <CategoryIcon
            title="뷰티"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321722/moa-beauty_p4kc2r.png"
            category="뷰티"
          />
        </View>
        <View>
          <CategoryIcon
            title="식품/건강"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1709355154/moa-%E1%84%80%E1%85%A5%E1%86%AB%E1%84%83%E1%85%A1%E1%86%BC_gnj9pw.png"
            category="식품/건강"
          />
        </View>

        <View>
          <CategoryIcon
            title="전체"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321721/moa-rank_mzoq5t.png"
          />
        </View>
      </View>
    </>
  );
};

export default Categories;
