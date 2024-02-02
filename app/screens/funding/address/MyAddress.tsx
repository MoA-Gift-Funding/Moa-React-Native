import React from 'react';
import useFunding from '../../../hooks/useFunding';
import TextRegular from '../../../components/text/TextRegular';
import AddressItem from './AddressItem';
import {View} from 'react-native';

const MyAddress = () => {
  const {addrsQuery} = useFunding();

  return (
    <View className="flex h-full">
      {addrsQuery && addrsQuery.length < 1 && (
        <TextRegular
          title="신규 입력으로 배송지를 등록해주세요🚚"
          style="text-Body-1 leading-Body-1 text-center text-Gray-08 mt-10"
        />
      )}
      {addrsQuery && addrsQuery.length > 0 && <AddressItem />}
    </View>
  );
};

export default MyAddress;
