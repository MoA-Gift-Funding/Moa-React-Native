import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import FriendItem from './components/FriendItem';

const MyFriends = () => {
  return (
    <KeyboardAvoidingView
      className="bg-white h-full"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 mt-2">
          <FriendItem
            item={{
              profileImage:
                'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703079069/moa-profile_tl4ilu.png',
              name: '랄프',
              birthday: '1204',
            }}
          />
          <FriendItem
            item={{
              profileImage:
                'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-suzy_ukhrxz.png',
              name: '배수지',
              birthday: '0204',
            }}
          />
          <FriendItem
            item={{
              profileImage:
                'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-loopy_kpoquw.png',
              name: '루피',
              birthday: '0711',
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MyFriends;
