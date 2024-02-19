import React from 'react';
import {Image, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {NotificationItem} from '../../../types/Notification';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ko from 'dayjs/locale/ko';
dayjs.extend(relativeTime);
dayjs.locale(ko);

const NotificationComponent = ({item}: {item: Partial<NotificationItem>}) => {
  const {type, title, message, imageUrl, createdDate} = item;
  return (
    <View className="border-b-2 border-Gray-02 py-4">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          {type === 'party' && (
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704344388/moa-celebrate_cimhrg.png',
              }}
              className="w-[17px] h-[17px]"
            />
          )}
          {type === 'message' && (
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704344388/moa-message_umsyfb.png',
              }}
              className="w-[17px] h-[17px]"
            />
          )}
          {type === 'check' && (
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704344388/moa-check_grlzv6.png',
              }}
              className="w-[17px] h-[17px]"
            />
          )}

          <TextSemiBold title={title} style="text-Body-2 text-Main-01 ml-1" />
        </View>
        <TextRegular
          title={dayjs().to(createdDate)}
          style="text-Body-2 leading-Body-2"
        />
      </View>
      <View className="flex flex-row justify-between mt-1">
        <View className="w-[250px] flex flex-row">
          <TextRegular title={message} style="text-Body-2 leading-Body-2" />
        </View>
        <Image
          source={{
            uri: imageUrl,
          }}
          className="w-[40px] h-[40px] rounded-full"
        />
      </View>
    </View>
  );
};

export default NotificationComponent;
