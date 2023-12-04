import * as React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import TextBold from '../components/text/TextBold';
import TextRegular from '../components/text/TextRegular';
import Footer from '../components/footer/Footer';

export default function Home({navigation}) {
  const {
    userState: {user},
  } = useUserContext();
  return (
    <>
      <ScrollView className="h-full">
        <ImageBackground
          className="w-full h-[320px]"
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701673489/moa-home_kbcww2.png',
          }}
          resizeMode="cover">
          <View className="h-full flex flex-col ml-4 mt-12">
            <Pressable className="mb-2">
              <Image
                className="w-[40px] h-[40px]"
                source={{
                  uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701672813/moa-alarm_szvywe.png',
                }}
              />
            </Pressable>
            <TextBold
              title={`${user?.nickname}님`}
              style="text-Heading-3 leading-Heading-3 text-white ml-2"
            />
            <TextBold
              title="직접 펀딩을 개설해"
              style="text-Heading-3 leading-Heading-3 text-white ml-2"
            />
            <TextBold
              title="선물을 전달해보세요."
              style="text-Heading-3 leading-Heading-3 text-white ml-2"
            />
            <Pressable className="h-[34px] w-[87px] bg-white flex items-center justify-center rounded-3xl mt-6 ml-2">
              <TextRegular title="바로가기" style="text-Body-1" />
            </Pressable>
          </View>
        </ImageBackground>
        <View />
      </ScrollView>
      <Footer screen="Home" />
    </>
  );
}
