import React from 'react';
import CategoryIcon from '../../components/button/CategoryIcon';
import {View} from 'react-native';

const Categories = () => {
  return (
    <>
      <View className="flex flex-row justify-center gap-2">
        <View>
          <CategoryIcon
            title="교환권"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321721/moa-voucher_wt5evf.png"
          />
        </View>
        <View>
          <CategoryIcon
            title="상품권"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321722/moa-giftCard_lst6kc.png"
          />
        </View>
        <View>
          <CategoryIcon
            title="럭셔리"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321721/moa-luxury_q41mdz.png"
          />
        </View>
        <View>
          <CategoryIcon
            title="테크"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321722/moa-tech_tcxkqk.png"
          />
        </View>
      </View>
      <View className="flex flex-row justify-center gap-2 mt-4">
        <View>
          <CategoryIcon
            title="패션"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321722/moa-fashion_ow6nql.png"
          />
        </View>
        <View>
          <CategoryIcon
            title="뷰티"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321722/moa-beauty_p4kc2r.png"
          />
        </View>
        <View>
          <CategoryIcon
            title="가구/리빙"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321721/moa-living_fksudz.png"
          />
        </View>
        <View>
          <CategoryIcon
            title="랭킹"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321721/moa-rank_mzoq5t.png"
          />
        </View>
      </View>
    </>
  );
};

export default Categories;
