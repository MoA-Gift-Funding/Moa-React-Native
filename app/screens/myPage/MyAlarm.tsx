import React from 'react';
import {ScrollView, View} from 'react-native';
import AlarmItem from './components/AlarmItem';

const MyAlarm = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-white border-t-2 border-Gray-02">
      <View className="px-6">
        <AlarmItem
          item={{
            category: 'fund',
            title: '친구의 새로운 펀딩',
            createdAt: '2024-01-04T14:30:00',
            message:
              '윤영주님의 [내 이번 생일 선물은요...] 펀딩이 개설되었습니다.',
            image:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704337430/moa-pretty_b3ko90.png',
          }}
        />
        <AlarmItem
          item={{
            category: 'completed',
            title: '펀딩 달성',
            createdAt: '2024-01-01T14:30:00',
            message:
              '[16학번 여기로 모여!] 펀딩이 달성 완료됐어요. 곧 펀딩 상품의 배송이 시작됩니다.',
            image:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1702543417/moa-nikeshoes_xodvda.png',
          }}
        />
        <AlarmItem
          item={{
            category: 'message',
            title: '펀딩 메세지 도착',
            createdAt: '2023-12-30T14:30:00',
            message:
              'from 그리니야 친한 친구야. 너의 생일을 진심으로 축하해. 오늘은 더욱 즐겁고 행복한 일만 가득하렴. 어쩌구 저쩌구 어쩌구 저쩌구...',
            image:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704337430/moa-mangom_usmbka.png',
          }}
        />
        <AlarmItem
          item={{
            category: 'fund',
            title: '친구의 새로운 펀딩',
            createdAt: '2023-12-04T14:30:00',
            message:
              '배수지님의 [미진이 집들이 선물할 사람!!] 펀딩이 개설되었습니다.',
            image:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-suzy_ukhrxz.png',
          }}
        />
      </View>
    </ScrollView>
  );
};

export default MyAlarm;
