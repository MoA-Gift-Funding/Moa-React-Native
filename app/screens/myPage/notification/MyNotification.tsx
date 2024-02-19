import React from 'react';
import {ScrollView, View} from 'react-native';
import NotificationComponent from './NotificationComponent';
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
              <NotificationComponent
                key={noti.id}
                item={{
                  type: noti.type,
                  title: noti.title,
                  createdDate: noti.createdDate,
                  message: noti.message,
                  imageUrl: noti.imageUrl,
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
