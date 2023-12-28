import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Circle, Path, Svg} from 'react-native-svg';
import TextRegular from '../../components/text/TextRegular';
import Countdown from 'react-countdown';
import {twoDP} from '../../utils/regex';
import {useNavigation} from '@react-navigation/native';
import {FundingItem} from '../../types/Funding';

const FundItem = ({item}: {item: FundingItem}) => {
  const {
    title,
    deadline,
    terminated,
    userId,
    profileImage,
    userName,
    productId,
    productImage,
  } = item;
  const navigation = useNavigation();
  const endTime = '2023-12-31T00:00:00';

  return (
    <Pressable
      className="flex flex-col"
      onPress={() => navigation.navigate('FundDetail')}>
      <View className="relative rounded-lg mr-2">
        <Image
          source={{
            uri: productImage,
          }}
          className="w-[170px] h-[170px] rounded-lg"
        />
        <View className="bg-Gray-09/50 absolute bottom-0 rounded-b-lg h-[35px] w-full flex flex-row items-center justify-center">
          <View className="mr-1">
            <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <Circle cx="7.14185" cy="7.30469" r="6.5" stroke="white" />
              <Path
                d="M7.1106 3.84525V7.5685L9.76366 9.24389"
                stroke="white"
                stroke-linecap="round"
              />
            </Svg>
          </View>
          <TextRegular
            title="마감 시간"
            style="text-white mr-1 text-Detail-1"
          />
          <Countdown
            date={deadline}
            renderer={({days, hours, minutes, seconds, completed}) => {
              if (completed) {
                return (
                  <TextRegular
                    title={'00:00:00'}
                    style="text-white mr-1 text-Detail-1"
                  />
                );
              } else {
                return (
                  <TextRegular
                    title={`${days}일 ${twoDP(hours)}:${twoDP(minutes)}:${twoDP(
                      seconds,
                    )}`}
                    style="text-white mr-1 text-Detail-1"
                  />
                );
              }
            }}
          />
        </View>
      </View>
      <View className="w-[170px]">
        <View className="flex flex-row items-center mt-3">
          <Image
            source={{
              uri: profileImage,
            }}
            className="w-[25px] h-[25px] rounded-full"
          />
          <TextRegular title={userName} style="text-Body-1 ml-2" />
        </View>
        <TextRegular
          title={title}
          numberOfLines={1}
          style="text-Body-2 mt-1 text-ellipsis "
        />
      </View>
    </Pressable>
  );
};

export default FundItem;
