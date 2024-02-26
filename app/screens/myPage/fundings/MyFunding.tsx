import React, {useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import cls from 'classnames';
import CreatedFundItem from './CreatedFundItem';
import useFunding from '../../../hooks/fundings/useFunding';
import {useRefetchOnFocus} from '../../../hooks/handlers/useRefetchOnFocus';
import TextRegular from '../../../components/text/TextRegular';

const MyFunding = () => {
  const [createdFunds, setCreatedFunds] = useState(true);
  const {
    myInfiteQuery,
    myInfiteFetchNextQuery,
    refetchMyInfiniteQuery,
    participatedFundsQuery,
    participatedNextQuery,
    refetchParticipatedFundsInfinityQuery,
  } = useFunding();

  useRefetchOnFocus(refetchMyInfiniteQuery);

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
      {createdFunds && (
        <View className="px-6 pb-10">
          {myInfiteQuery && (
            <>
              {myInfiteQuery.pages[0].content.length > 0 && (
                <FlatList
                  data={myInfiteQuery.pages.flatMap(page =>
                    page.content.flat(),
                  )}
                  renderItem={fund => <CreatedFundItem content={fund.item} />}
                  keyExtractor={fund => fund.id}
                  showsVerticalScrollIndicator={false}
                  onEndReached={async () => await myInfiteFetchNextQuery()}
                  onEndReachedThreshold={0.6}
                />
              )}
              {myInfiteQuery.pages[0].content.length < 1 && (
                <TextRegular
                  title="펀딩을 만들어볼까요?🎁"
                  style="text-Gray-06 py-10 text-center"
                />
              )}
            </>
          )}
        </View>
      )}
      {!createdFunds && (
        <View>
          {participatedFundsQuery && (
            <>
              {participatedFundsQuery.pages[0].content.length > 0 && (
                <FlatList
                  data={participatedFundsQuery.pages.flatMap(page =>
                    page.content.flat(),
                  )}
                  renderItem={fund => <CreatedFundItem content={fund.item} />}
                  keyExtractor={fund => fund.id}
                  showsVerticalScrollIndicator={false}
                  onEndReached={async () => await myInfiteFetchNextQuery()}
                  onEndReachedThreshold={0.6}
                />
              )}
              {participatedFundsQuery.pages[0].content.length < 1 && (
                <TextRegular
                  title="친구들의 펀딩에 참여해봐요🤗"
                  style="text-Gray-06 py-10 text-center"
                />
              )}
            </>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default MyFunding;
