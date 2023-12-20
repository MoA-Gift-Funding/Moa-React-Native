import React, {useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {useUserContext} from '../../contexts/UserContext';
import TextBold from '../../components/text/TextBold';
import Footer from '../../components/footer/Footer';
import HomeBanner from './HomeBanner';
import cls from 'classnames';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import ProgressBar from '../../components/bar/ProgressBar';
import MyFund from './MyFund';

export default function Home({navigation}) {
  const {
    userState: {user},
  } = useUserContext();
  const [inProcess, setInProcess] = useState(true);
  const [completed, setCompleted] = useState(false);
  const handleMenuPress = (component: string) => {
    if (component === 'inProcess') {
      setInProcess(true);
      return setCompleted(false);
    }
    setInProcess(false);
    setCompleted(true);
  };
  return (
    <>
      <ScrollView className="h-full">
        <HomeBanner navigation={navigation} />
        <View className="flex flex-row h-[40px] bg-white justify-around border-b-2 border-Gray-02">
          <Pressable
            className={cls({
              'border-b-2 border-Main-01': inProcess,
              '': !inProcess,
            })}
            onPress={() => handleMenuPress('inProcess')}>
            <TextBold
              title="진행중"
              style={cls('text-center text-Heading-4', {
                'text-Main-01': inProcess,
                'text-Gray-06': !inProcess,
              })}
            />
          </Pressable>
          <Pressable
            onPress={() => handleMenuPress('completed')}
            className={cls({
              'border-b-2 border-Main-01': completed,
              '': !completed,
            })}>
            <TextBold
              title="완료"
              style={cls('text-center text-Heading-4', {
                'text-Main-01': completed,
                'text-Gray-06': !completed,
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
            showsHorizontalScrollIndicator={false}>
            <MyFund />
            <MyFund />
            <MyFund />
          </ScrollView>
        </View>
      </ScrollView>
      <Footer screen="Home" />
    </>
  );
}
