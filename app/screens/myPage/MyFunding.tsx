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
import ParticipatedFundItem from './components/ParticipatedFundItem';

const MyFunding = () => {
  const [createdFunds, setCreatedFunds] = useState(true);
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
            onPress={() => setCreatedFunds(true)}>
            <TextSemiBold
              title="내가 만든 펀딩"
              style={cls('text-Body-2', {'text-Gray-06': !createdFunds})}
            />
          </Pressable>
          <Pressable
            className={cls('h-[48px] flex justify-center items-center flex-1', {
              'border-b-2 border-Main-01': !createdFunds,
            })}
            onPress={() => setCreatedFunds(false)}>
            <TextSemiBold
              title="참여한 펀딩"
              style={cls('text-Body-2', {'text-Gray-06': createdFunds})}
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
                  deadline: '24.01.10',
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
                  title: '경민이 집들이 선물',
                  deadline: '23.09.13',
                  fundRate: 75,
                  activated: 'N',
                  productImage:
                    'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1691491069/Cloudinary-React/h23ilj5zs2wveoeembqm.jpg',
                  fundedCount: 17,
                }}
              />
            </>
          )}
          {!createdFunds && (
            <>
              <ParticipatedFundItem
                item={{
                  id: 1,
                  title: 'HAPPY BIRTHDAY!!🎁',
                  activated: 'Y',
                  productImage:
                    'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img2_dnu8xk.png',
                  paidDate: '23.10.10',
                  price: '20000',
                  name: '몽글이',
                }}
              />
              <ParticipatedFundItem
                item={{
                  id: 1,
                  title: '올해 선물은 이걸로 부탁할게 친구들아!',
                  activated: 'N',
                  productImage:
                    'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
                  paidDate: '23.10.10',
                  price: '50000',
                  name: '바보',
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
