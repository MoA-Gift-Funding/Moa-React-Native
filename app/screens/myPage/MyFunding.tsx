import React, {useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import cls from 'classnames';
import CreatedFundItem from './components/CreatedFundItem';
import useFunding from '../../hooks/useFunding';
import {MyFundItem} from '../../types/Funding';
import {v4 as uuidv4} from 'uuid';

const MyFunding = () => {
  const [createdFunds, setCreatedFunds] = useState(true);
  const {myInfiteQuery} = useFunding();

  return (
    <KeyboardAvoidingView
      className="bg-white h-full"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
      {myInfiteQuery && (
        <View className="px-6 pb-10">
          {createdFunds &&
            myInfiteQuery.pages.map(item => (
              <FlatList
                data={item.content.filter(
                  (fund: MyFundItem) => fund.status === '진행중',
                )}
                renderItem={fund => <CreatedFundItem content={fund.item} />}
                key={uuidv4}
                showsVerticalScrollIndicator={false}
              />
            ))}
          {!createdFunds &&
            myInfiteQuery.pages.map(item => (
              <FlatList
                data={item.content.filter(
                  (fund: MyFundItem) => fund.status !== '진행중',
                )}
                renderItem={fund => <CreatedFundItem content={fund.item} />}
                key={uuidv4}
                showsVerticalScrollIndicator={false}
              />
            ))}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default MyFunding;
