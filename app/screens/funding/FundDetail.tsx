import React, {useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Share,
  View,
} from 'react-native';
import LoadingBar from '../../components/bar/LoadingBar';
import cls from 'classnames';
import TextSemiBold from '../../components/text/TextSemiBold';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import TextRegular from '../../components/text/TextRegular';
import {useForm} from 'react-hook-form';
import FundDesc from './FundDesc';
import FundMessage from './FundMessage';

const FundDetail = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(true);
  const [message, setMessage] = useState(false);
  const [caution, setCaution] = useState(true);
  const handleSelection = () => {
    setDescription(!description);
    setMessage(!message);
  };
  const {handleSubmit} = useForm();
  return (
    <ScrollView className="flex flex-col" showsVerticalScrollIndicator={false}>
      {loading && <LoadingBar />}
      <Image
        className="w-[360px] h-[360px]"
        source={{
          uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
        }}
      />
      <FundDesc />
      <View className="mt-4 bg-white flex flex-col items-center">
        <View className="w-full flex flex-row justify-center border-b-[1px] border-b-Gray-03">
          <Pressable
            className={cls(
              'w-[156px] h-[48px] flex items-center justify-center',
              {'border-b-Main-01 border-b-2': description},
            )}
            onPress={handleSelection}>
            <TextSemiBold title="소개글" style="text-Gray-10" />
          </Pressable>
          <Pressable
            className={cls(
              'w-[156px] h-[48px] flex items-center justify-center',
              {'border-b-Main-01 border-b-2': message},
            )}
            onPress={handleSelection}>
            <TextSemiBold title="메세지" style="text-Gray-10" />
          </Pressable>
        </View>
        <View className="w-full py-6">
          {description && (
            <>
              <View className="pb-4 mx-6">
                <TextRegular
                  title={
                    '펀딩 상세 소개글할지라도 피는 것이 어디 꽃 현저하게 이것이다. 청춘의 거선의 품었기 것이다. 것은 별과 대중을 피부가 기쁘며, 아름답고 칼이다. 이성은 방지하는 따뜻한 그리하였는가?있으며, 찾아 별과 우리는 무엇을 가진 쓸쓸하랴? 같으며, 불어 거친 어디 그리하였는가? 무엇을 인간에 날카로우나 바이며, 얼음에 만물은 싹이 봄바람이다.붙잡아 얼음과 얼음 것이 착목한는 영원히 위하여서. 꽃이 꽃이 귀는 끝에 것이다.'
                  }
                  style="text-Gray-06 text-Body-2 leading-Body-2"
                />
              </View>
              <Pressable
                className="w-full border-y-[1px] border-Gray-02 flex items-center"
                onPress={() => setCaution(!caution)}>
                <View className="w-[312px] h-[60px] flex flex-row justify-between items-center">
                  <TextSemiBold
                    title="펀딩 취소 규정"
                    style="text-Body-2 text-Gray-10"
                  />
                  <FontAwesomeIcon
                    icon={caution ? faChevronDown : faChevronUp}
                  />
                </View>
                {caution && (
                  <View className="w-full bg-Gray-02 flex items-center py-4">
                    <TextRegular
                      title="- 취소 안돼"
                      style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                    />
                    <TextRegular
                      title="- 하지마요"
                      style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                    />
                    <TextRegular
                      title="- 수수료 나와요"
                      style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                    />
                  </View>
                )}
              </Pressable>
            </>
          )}
          {message && (
            <View>
              <FundMessage />
              <FundMessage />
              <FundMessage />
            </View>
          )}
        </View>
      </View>
      <View className="bg-white flex flex-row items-center py-6 px-2 justify-evenly">
        <Pressable
          className="bg-Gray-08 w-[70px] h-[56px] flex items-center justify-center rounded-lg"
          onPress={async () => {
            Platform.OS === 'ios'
              ? Share.share({
                  url: 'https://www.giftmoa.co.kr/',
                  message: '이 상품 어때요?',
                })
              : Share.share({
                  title: '이 상품 어때요?',
                  message: 'https://www.giftmoa.co.kr/',
                });
          }}>
          <TextSemiBold title="공유" style="text-white text-Body-1" />
        </Pressable>
        <Pressable
          className={
            'h-[56px] w-[234px] bg-Main-01 rounded-lg flex items-center justify-center'
          }
          onPress={() => navigation.navigate('JoinFund')}>
          <TextSemiBold
            style="text-white text-Body-1 ml-[14px]"
            title="선물 펀딩하기"
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default FundDetail;
