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
            categoryType="TICKET"
          />
        </View>
        <View>
          <CategoryIcon
            title="피자/치킨"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321721/moa-voucher_wt5evf.png"
            categoryType="VOUCHER"
          />
        </View>
        <View>
          <CategoryIcon
            title="뷰티"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321722/moa-beauty_p4kc2r.png"
            categoryType="VOUCHER"
          />
        </View>
        <View>
          <CategoryIcon
            title="식품/건강"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321722/moa-fashion_ow6nql.png"
            categoryType="VOUCHER"
          />
        </View>
        <View>
          <CategoryIcon
            title="편의점"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321722/moa-tech_tcxkqk.png"
            categoryType="VOUCHER"
          />
        </View>
        <View>
          <CategoryIcon
            title="리빙/잡화"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321721/moa-living_fksudz.png"
            categoryType="VOUCHER"
          />
        </View>
        <View>
          <CategoryIcon
            title="영화"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321721/moa-luxury_q41mdz.png"
            categoryType="VOUCHER"
          />
        </View>
        <View>
          <CategoryIcon
            title="전체"
            uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321721/moa-rank_mzoq5t.png"
            categoryType="VOUCHER"
          />
        </View>
      </View>
    </>
  );
};

export default Categories;
