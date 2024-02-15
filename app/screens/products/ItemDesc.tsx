import React from 'react';
import {View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import TextBold from '../../components/text/TextBold';

const ItemDesc = ({
  brand,
  name,
  salesNumber,
  price,
}: {
  brand: string;
  name: string;
  price: string;
  salesNumber?: string;
}) => {
  return (
    <View className="flex items-center bg-white">
      <View className="w-[312px]">
        <View className="flex flex-col py-4 border-b-[1px] border-b-Gray-02">
          <TextRegular
            title={brand}
            style="text-Gray-06 text-Body-2 leading-Body-2"
          />
          <TextRegular
            title={name}
            style="text-Gray-10 text-Body-1 leading-Body-1"
          />
          <View className="flex flex-row mt-2">
            {salesNumber && (
              <TextBold
                title={`${salesNumber}%`}
                style="text-Main-01 text-Heading-4 leading-Heading-4 mr-2"
              />
            )}
            <TextBold
              title={`${price}원`}
              style="text-Gray-10 text-Heading-4 leading-Heading-4"
            />
          </View>
        </View>
        <View className="flex flex-row items-center py-4">
          <TextRegular
            title="MoA와 함께 선물 펀딩을 진행해보세요!"
            style="bg-Sub-01/100 p-2 text-Main-01 text-center rounded-sm"
          />
        </View>
      </View>
    </View>
  );
};

export default ItemDesc;
