import React from 'react';
import {FlatList, View} from 'react-native';
import MessageItem from './MessageItem';
import useFunding from '../../../hooks/fundings/useFunding';
import {useRefetchOnFocus} from '../../../hooks/handlers/useRefetchOnFocus';
import TextRegular from '../../../components/text/TextRegular';

const MyMessages = () => {
  const {
    recievedMessagesQuery,
    recievedMessagesInfiniteQuery,
    recievedMessagesNextPageQuery,
    refetchRecievedMessagesQuery,
  } = useFunding(0, 10);
  useRefetchOnFocus(refetchRecievedMessagesQuery);
  return (
    <View className="bg-white h-full">
      <View className="px-5 border-t-2 border-Gray-02">
        {recievedMessagesInfiniteQuery && (
          <FlatList
            data={recievedMessagesInfiniteQuery.pages.flatMap(page =>
              page.content.flat(),
            )}
            renderItem={message => <MessageItem item={message.item} />}
            keyExtractor={message => `${message.memberId}${message.id}`}
            showsVerticalScrollIndicator={false}
            onEndReached={async () => await recievedMessagesNextPageQuery()}
            onEndReachedThreshold={0.6}
          />
        )}
        {recievedMessagesQuery && recievedMessagesQuery.length < 1 && (
          <View className=" my-10">
            <TextRegular
              title="메세지가 없어요."
              style="text-Gray-06 text-center"
            />
            <TextRegular
              title="펀딩을 만들어 친구들에게 메세지를 받아보세요💌"
              style="text-Gray-06 text-center"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default MyMessages;
