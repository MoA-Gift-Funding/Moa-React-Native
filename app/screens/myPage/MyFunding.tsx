import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import cls from 'classnames';
import CreatedFundItem from './components/CreatedFundItem';

const MyFunding = () => {
  const [createdFunds, setCreatedFunds] = useState(true);
  const [participatedFunds, setParticipatedFunds] = useState(false);
  const pressMenuControl = () => {
    setCreatedFunds(!createdFunds);
    setParticipatedFunds(!participatedFunds);
  };
  return (
    <KeyboardAvoidingView
      className="bg-white h-full"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center h-[48px] border-b-2 border-Gray-02 px-6">
          <Pressable
            className={cls('h-[48px] flex justify-center items-center flex-1', {
              'border-b-2 border-Main-01': createdFunds,
            })}
            onPress={pressMenuControl}>
            <TextSemiBold
              title="내가 만든 펀딩"
              style={cls('text-Body-2', {'text-Gray-06': !createdFunds})}
            />
          </Pressable>
          <Pressable
            className={cls('h-[48px] flex justify-center items-center flex-1', {
              'border-b-2 border-Main-01': participatedFunds,
            })}
            onPress={pressMenuControl}>
            <TextSemiBold
              title="참여한 펀딩"
              style={cls('text-Body-2', {'text-Gray-06': !participatedFunds})}
            />
          </Pressable>
        </View>
        <View className="px-6">
          {createdFunds && (
            <>
              <CreatedFundItem
                item={{
                  id: 1,
                  title: '수지 생일 맞이 아디다스 삼발',
                  deadline: '23.10.10',
                  fundRate: 75,
                  activated: 'Y',
                  productImage:
                    'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
                  fundedCount: 17,
                }}
              />
              <CreatedFundItem
                item={{
                  id: 1,
                  title: '수지 생일 맞이 아디다스 삼발',
                  deadline: '23.10.10',
                  fundRate: 75,
                  activated: 'Y',
                  productImage:
                    'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
                  fundedCount: 17,
                }}
              />
            </>
          )}
          {participatedFunds && (
            <>
              <CreatedFundItem
                item={{
                  id: 1,
                  title: '수지 생일 맞이 아디다스 삼발',
                  deadline: '23.10.10',
                  fundRate: 75,
                  activated: 'Y',
                  productImage:
                    'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
                  fundedCount: 17,
                }}
              />
              <CreatedFundItem
                item={{
                  id: 1,
                  title: '수지 생일 맞이 아디다스 삼발',
                  deadline: '23.10.10',
                  fundRate: 75,
                  activated: 'Y',
                  productImage:
                    'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
                  fundedCount: 17,
                }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MyFunding;
