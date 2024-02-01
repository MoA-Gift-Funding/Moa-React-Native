import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import FriendItem from './components/FriendItem';
import TextSemiBold from '../../components/text/TextSemiBold';
import cls from 'classnames';
import useFriends from '../../hooks/useFriends';

const MyFriends = () => {
  const [blocked, setBlocked] = useState(false);
  const {friendsQuery} = useFriends();

  return (
    <KeyboardAvoidingView
      className="bg-white h-full"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center h-[48px] border-b-2 border-Gray-02 px-6">
          <Pressable
            className={cls('h-[48px] flex justify-center items-center flex-1', {
              'border-b-2 border-Main-01': !blocked,
            })}
            onPress={() => setBlocked(false)}>
            <TextSemiBold
              title="친구"
              style={cls('text-Body-2', {'text-Gray-06': blocked})}
            />
          </Pressable>
          <Pressable
            className={cls('h-[48px] flex justify-center items-center flex-1', {
              'border-b-2 border-Main-01': blocked,
            })}
            onPress={() => setBlocked(true)}>
            <TextSemiBold
              title="차단한 친구"
              style={cls('text-Body-2', {'text-Gray-06': !blocked})}
            />
          </Pressable>
        </View>
        <View className="px-6 mt-2 ">
          {!blocked &&
            friendsQuery
              ?.filter(friends => !friends.isBlocked)
              .map(({profileImageUrl, customNickname, birthday, isBlocked}) => (
                <FriendItem
                  item={{
                    profileImageUrl,
                    customNickname,
                    birthday,
                    isBlocked,
                  }}
                />
              ))}

          {blocked &&
            friendsQuery
              ?.filter(friends => friends.isBlocked)
              .map(({profileImageUrl, customNickname, birthday, isBlocked}) => (
                <FriendItem
                  item={{
                    profileImageUrl,
                    customNickname,
                    birthday,
                    isBlocked,
                  }}
                />
              ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MyFriends;
