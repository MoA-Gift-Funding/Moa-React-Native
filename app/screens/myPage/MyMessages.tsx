import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import TextSemiBold from '../../components/text/TextSemiBold';
import MessageItem from './components/MessageItem';

const MyMessages = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      <View className="px-4">
        <MessageItem
          item={{
            profileImage:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704337430/moa-mangom_usmbka.png',
            message:
              '친한 친구야. 너의 생일을 진심으로 축하해. 오늘은 더욱 즐겁고 행복한 일만 가득하렴. 어쩌구 저쩌구 어쩌구 저쩌구...친한 친구야. 너의 생일을 진심으로 축하해. 오늘은 더욱 즐겁고 행복한 일만 가득하렴. 어쩌구 저쩌구 어쩌구 저쩌구...',
            name: '망곰이',
            createdAt: '23.12.23',
          }}
        />
        <MessageItem
          item={{
            profileImage:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-loopy_kpoquw.png',
            message: '지현아 퇴사 축하해 행복하자!',
            name: 'hellojihyung',
            createdAt: '23.12.20',
          }}
        />
        <MessageItem
          item={{
            profileImage:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704337430/moa-dex_mkqh2e.png',
            message:
              '친한 친구야. 너의 생일을 진심으로 축하해. 오늘은 더욱 즐겁고 행복한 일만 가득하렴. 어쩌구 저쩌구 어쩌구 저쩌구',
            name: '덱스',
            createdAt: '23.12.23',
          }}
        />
        <MessageItem
          item={{
            profileImage:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704337430/moa-pretty_b3ko90.png',
            message:
              '친한 친구야. 너의 생일을 진심으로 축하해. 오늘은 더욱 즐겁고 행복한 일만 가득하렴. 어쩌구 저쩌구 어쩌구 저쩌구...친한 친구야. 너의 생일을 진심으로 축하해. 오늘은 더욱 즐겁고 행복한 일만 가득하렴. 어쩌구 저쩌구 어쩌구 저쩌구',
            name: '윤영주',
            createdAt: '23.12.23',
          }}
        />
        <MessageItem
          item={{
            profileImage:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703079069/moa-profile_tl4ilu.png',
            message:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            name: 'WreckIt Ralph',
            createdAt: '23.12.23',
          }}
        />
        <MessageItem
          item={{
            profileImage:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-suzy_ukhrxz.png',
            message:
              '친한 친구야. 너의 생일을 진심으로 축하해. 오늘은 더욱 즐겁고 행복한 일만 가득하렴. 어쩌구 저쩌구 어쩌구 저쩌구...',
            name: '배수지',
            createdAt: '23.12.23',
          }}
        />
        <MessageItem
          item={{
            profileImage:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704337430/moa-dex_mkqh2e.png',
            message:
              '친한 친구야. 너의 생일을 진심으로 축하해. 오늘은 더욱 즐겁고 행복한 일만 가득하렴. 어쩌구 저쩌구 어쩌구 저쩌구',
            name: '덱스',
            createdAt: '23.12.23',
          }}
        />
      </View>
    </ScrollView>
  );
};

export default MyMessages;
