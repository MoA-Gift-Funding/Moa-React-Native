import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextBold from '../../components/text/TextBold';
import TextRegular from '../../components/text/TextRegular';
import TextSemiBold from '../../components/text/TextSemiBold';
import {useNavigation} from '@react-navigation/native';
import Countdown from 'react-countdown';
import {MyFundingItem} from '../../types/Funding';
import {useUserContext} from '../../contexts/UserContext';

const MyFund = ({item}: {item: MyFundingItem}) => {
  const {title, deadline, fundRate, terminated, fundedCount} = item;
  const {
    userState: {user},
  } = useUserContext();
  const navigation = useNavigation();
  return (
    <Pressable
      className="w-[285px] rounded-2xl mr-4 mb-2"
      style={{elevation: 3, backgroundColor: 'transparent'}}
      onPress={() => navigation.navigate('FundDetail')}>
      <View className="bg-Gray-03 h-[89px] rounded-t-xl shadow-lg flex flex-row px-4 justify-between items-center">
        <View className="flex flex-col">
          <Countdown
            date={deadline}
            renderer={({days, completed}) => {
              if (completed) {
                return <TextBold title={'D-0'} style="text-Body-1" />;
              } else {
                return <TextBold title={`D-${days}`} style="text-Body-1" />;
              }
            }}
          />
          <TextRegular
            title={`#${title.substring(0, 14)}...`}
            style="text-Body-1"
          />
        </View>
        <Image
          className="w-[58px] h-[58px] rounded-full"
          source={{
            uri:
              user?.profileImage[4] !== 's'
                ? `https://${user.profileImage?.substring(7)}`
                : user.profileImage,
          }}
        />
      </View>
      <View className="bg-white h-[60px] rounded-b-xl shadow-lg flex flex-col px-4 justify-center">
        <View className="flex flex-row justify-between w-full">
          <TextSemiBold title={`${fundRate}% 펀딩`} style="text-Main-01" />
          <TextSemiBold
            title={`${fundedCount}명 참여중`}
            style="text-Gray-08"
          />
        </View>
        <View className="w-full bg-Sub-01 rounded-full h-3 mt-2">
          <View className={`bg-Main-01 h-3 rounded-full w-[${fundRate}%]`} />
        </View>
      </View>
    </Pressable>
  );
};

export default MyFund;
