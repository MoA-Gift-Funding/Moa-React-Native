import React from 'react';
import {ScrollView, View} from 'react-native';
import NotificationItem from './NotificationItem';
import useNotifications from '../../../hooks/notification/useNotifications';
import {useRefetchOnFocus} from '../../../hooks/handlers/useRefetchOnFocus';
import TextRegular from '../../../components/text/TextRegular';

const MyNotification = () => {
  const {notificationsQuery, refetchNotificationsQuery} = useNotifications();
  useRefetchOnFocus(refetchNotificationsQuery);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-white border-t-2 border-Gray-02">
      {notificationsQuery && (
        <View className="px-6">
          {notificationsQuery.length > 0 &&
            notificationsQuery.map(noti => (
              <NotificationItem
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
            ))}
          {notificationsQuery.length < 1 && (
            <View className="mt-10">
              <TextRegular
                title="알림이 없어요🤗"
                style="text-center text-Gray-06"
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default MyNotification;
