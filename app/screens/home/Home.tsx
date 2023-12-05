import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {useUserContext} from '../../contexts/UserContext';
import TextBold from '../../components/text/TextBold';
import Footer from '../../components/footer/Footer';
import HomeBanner from './HomeBanner';

export default function Home({navigation}) {
  const {
    userState: {user},
  } = useUserContext();
  return (
    <>
      <ScrollView className="h-full">
        <HomeBanner />
        <View className="flex flex-row h-[40px] bg-white justify-evenly border-b-2 border-Gray-02">
          <View className="w-[60px] h-[40px] border-b-2 border-Main-01">
            <TextBold title="진행중" style=" text-center" />
          </View>
          <View className="w-[60px] h-[40px] ">
            <TextBold title="완료" style="text-center " />
          </View>
        </View>
        <View className="h-full bg-white">
          <TextBold title="hi" />
        </View>
      </ScrollView>
      <Footer screen="Home" />
    </>
  );
}
