import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import useFunding from '../../hooks/fundings/useFunding';
import SideToggle from '../../components/button/SideToggle';
import {FriendFundItem} from '../../types/Funding';
import FundItem from './components/FundItem';
import {useRefetchOnFocus} from '../../hooks/handlers/useRefetchOnFocus';

const FriendFundList = () => {
  const [activated, setActivated] = useState(true);
  const {
    friendFundingInfiteFetchNextQuery,
    friendFundingInfiteQuery,
    refetchFriendFundingInfiteQuery,
  } = useFunding();
  useRefetchOnFocus(refetchFriendFundingInfiteQuery);
  return (
    <View className="h-full bg-white">
      <SideToggle
        state={activated}
        onPress={setActivated}
        leftTxt="진행중"
        rightTxt="종료"
      />
      {friendFundingInfiteQuery && (
        <View className="pb-10 flex items-center justify-center">
          <View className="w-[360px]">
            {activated && (
              <FlatList
                data={friendFundingInfiteQuery.pages.flatMap(page =>
                  page.content
                    .filter(
                      (fund: FriendFundItem) => fund.status === 'PROCESSING',
                    )
                    .flat(),
                )}
                renderItem={fund => <FundItem item={fund.item} />}
                keyExtractor={fund => fund.id}
                showsVerticalScrollIndicator={false}
                onEndReached={async () =>
                  await friendFundingInfiteFetchNextQuery()
                }
                onEndReachedThreshold={0.6}
                numColumns={2}
              />
            )}
            {!activated && (
              <FlatList
                data={friendFundingInfiteQuery.pages.flatMap(page =>
                  page.content
                    .filter(
                      (fund: FriendFundItem) => fund.status !== 'PROCESSING',
                    )
                    .flat(),
                )}
                renderItem={fund => <FundItem item={fund.item} />}
                keyExtractor={fund => fund.id}
                showsVerticalScrollIndicator={false}
                onEndReached={async () =>
                  await friendFundingInfiteFetchNextQuery()
                }
                onEndReachedThreshold={0.6}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default FriendFundList;
