import React, {useState} from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
import LoadingBar from '../../components/bar/LoadingBar';
import ItemDesc from '../store/ItemDesc';
import cls from 'classnames';
import TextSemiBold from '../../components/text/TextSemiBold';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import TextRegular from '../../components/text/TextRegular';
import NextButton from '../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import FundDesc from './FundDesc';

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
        <View className="w-full py-6 mx-6">
          {description && (
            <>
              <TextRegular
                title={'어쩌고저쩌고'}
                style="text-Gray-06 text-Body-2 leading-Body-2"
              />
              <Pressable
                className="w-full border-y-[1px] border-Gray-02 flex items-center"
                onPress={() => setCaution(!caution)}>
                <View className="w-full h-[60px] flex flex-row justify-between items-center">
                  <TextSemiBold
                    title="주의 사항"
                    style="text-Body-2 text-Gray-10"
                  />
                  <FontAwesomeIcon
                    icon={caution ? faChevronDown : faChevronUp}
                  />
                </View>
                {caution && (
                  <View className="w-full bg-Gray-02 flex items-center py-4">
                    <TextRegular
                      title="어쩌저저쩌저"
                      style="text-Body-2 text-Gray-06 leading-Body-2"
                    />
                  </View>
                )}
              </Pressable>
            </>
          )}
          {message && (
            <TextRegular
              title="ㅗㅑ"
              style="text-Gray-06 text-Body-2 leading-Body-2"
            />
          )}
        </View>
      </View>
      <View className="bg-white flex flex-row items-center py-6 px-2 justify-evenly">
        <Pressable className="bg-Gray-08 w-[70px] h-[56px] flex items-center justify-center rounded-lg">
          <TextSemiBold title="공유" style="text-white text-Body-1" />
        </Pressable>
        <Pressable
          className={
            'h-[56px] w-[234px] bg-Main-01 rounded-lg flex items-center justify-center'
          }>
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
