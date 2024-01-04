import React, {useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Share,
  View,
} from 'react-native';
import {useUserContext} from '../../contexts/UserContext';
import TextBold from '../../components/text/TextBold';
import Footer from '../../components/footer/Footer';
import HomeBanner from './HomeBanner';
import cls from 'classnames';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import MyFund from './MyFund';
import FundItem from './FundItem';

export default function Home({navigation}) {
  const {
    userState: {user},
  } = useUserContext();
  const [activated, setActivated] = useState(true);

  return (
    <>
      <ScrollView className="h-full">
        <HomeBanner navigation={navigation} />
        <View className="flex flex-row h-[40px] bg-white justify-around border-b-2 border-Gray-02">
          <Pressable
            className={cls({
              'border-b-2 border-Main-01': activated,
              '': !activated,
            })}
            onPress={() => setActivated(true)}>
            <TextBold
              title="진행중"
              style={cls('text-center text-Heading-4', {
                'text-Main-01': activated,
                'text-Gray-06': !activated,
              })}
            />
          </Pressable>
          <Pressable
            onPress={() => setActivated(false)}
            className={cls({
              'border-b-2 border-Main-01': !activated,
              '': activated,
            })}>
            <TextBold
              title="완료"
              style={cls('text-center text-Heading-4', {
                'text-Main-01': !activated,
                'text-Gray-06': activated,
              })}
            />
          </Pressable>
        </View>
        <View className="bg-white flex flex-col py-10 justify-center">
          <View className="flex flex-row justify-between items-center mx-6">
            <TextSemiBold
              title={`${user?.nickname}님의 펀딩`}
              style="text-Heading-4"
            />
            <Pressable>
              <TextSemiBold
                title="모두보기 >"
                style="text-Detail-1 text-Gray-06"
              />
            </Pressable>
          </View>
          <ScrollView
            className="py-4 pl-6 flex flex-row"
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            {activated && (
              <>
                <MyFund
                  item={{
                    id: 1,
                    title: '내 30번째 생일은 에어팟으로 할래',
                    deadline: '2024-01-31T00:00:00',
                    fundRate: 80,
                    activated: 'Y',
                    fundedCount: 14,
                  }}
                />
                <MyFund
                  item={{
                    id: 1,
                    title: '경민이 결혼 집들이 선물',
                    deadline: '2024-02-14T00:00:00',
                    fundRate: 22,
                    activated: 'Y',
                    fundedCount: 2,
                  }}
                />
              </>
            )}
            {!activated && (
              <>
                <MyFund
                  item={{
                    id: 1,
                    title: '올해 선물은 이거로 부탁할게 친구들아!',
                    deadline: '2023-12-31T00:00:00',
                    fundRate: 80,
                    activated: 'N',
                    fundedCount: 14,
                  }}
                />
                <MyFund
                  item={{
                    id: 1,
                    title: '☃🌲 윤정이의 겨울나기 ❄🎅',
                    deadline: '2024-01-02T00:00:00',
                    fundRate: 22,
                    activated: 'N',
                    fundedCount: 2,
                  }}
                />
              </>
            )}
          </ScrollView>
        </View>
        <View className="bg-white my-4 py-10 flex flex-col">
          <View className="flex flex-row ml-6">
            <TextSemiBold title="현재 " style="text-Heading-4" />
            <TextSemiBold title="진행중" style="text-Heading-4 text-Main-01" />
            <TextSemiBold title="인 펀딩" style="text-Heading-4" />
          </View>
          <View className="flex flex-row gap-1 mt-6 ml-6">
            <Pressable className="bg-Main-01 px-4 h-[32px] flex justify-center items-center rounded-3xl">
              <TextRegular title="전체" style="text-white" />
            </Pressable>
            <Pressable className="bg-Sub-01 px-4 h-[32px] flex justify-center items-center rounded-3xl">
              <TextRegular title="생일" style="text-Main-01" />
            </Pressable>
            <Pressable className="bg-Sub-01 px-4 h-[32px] flex justify-center items-center rounded-3xl">
              <TextRegular title="집들이" style="text-Main-01" />
            </Pressable>
          </View>
          <ScrollView
            className="flex flex-row py-6 px-6"
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            <FundItem
              item={{
                id: 1,
                title: '내 30번째 생일은 에어팟으로 할래',
                deadline: '2023-12-31T00:00:00',
                activated: 'N',
                userId: 1,
                profileImage:
                  'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-suzy_ukhrxz.png',
                userName: '배수지',
                productId: 1,
                productImage:
                  'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img2_dnu8xk.png',
              }}
            />

            <FundItem
              item={{
                id: 1,
                title: '졸업식 선물은 이걸루',
                deadline: '2024-01-14T00:00:00',
                activated: 'N',
                userId: 1,
                profileImage:
                  'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-loopy_kpoquw.png',
                userName: '루피',
                productId: 1,
                productImage:
                  'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
              }}
            />
            <FundItem
              item={{
                id: 1,
                title: '경민이 집들이 선물',
                deadline: '2024-01-31T00:00:00',
                activated: 'N',
                userId: 1,
                profileImage:
                  'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703079069/moa-profile_tl4ilu.png',
                userName: '주먹왕 랄프',
                productId: 1,
                productImage:
                  'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1691491069/Cloudinary-React/h23ilj5zs2wveoeembqm.jpg',
              }}
            />
          </ScrollView>
          <Pressable
            className="mt-10 bg-white rounded-xl"
            onPress={async () => {
              Platform.OS === 'ios'
                ? Share.share({
                    url: 'https://www.giftmoa.co.kr/',
                    message: '새로운 선물 경험을 선사하는 플랫폼, 모아',
                  })
                : Share.share({
                    title: '새로운 선물 경험을 선사하는 플랫폼, 모아',
                    message: 'https://www.giftmoa.co.kr/',
                  });
            }}>
            <Image
              className="w-full h-[136px] rounded-xl"
              source={{
                uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703226051/moa-banner2_atc4su.png',
              }}
            />
          </Pressable>
        </View>
      </ScrollView>
      <Footer screen="Home" />
    </>
  );
}
