import React from 'react';
import {Image, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ko from 'dayjs/locale/ko';
import {Participant} from '../../../types/Funding';
import ReportButton from '../../../components/button/ReportButton';
dayjs.extend(relativeTime);
dayjs.locale(ko);

const FundMessage = ({
  messageId,
  message,
  nickName,
  createAt,
  profileImageUrl,
}: Partial<Participant>) => {
  return (
    <View className="flex flex-col border-b-2 border-Gray-01 py-4 px-6">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <Image
            source={{
              uri: profileImageUrl,
            }}
            className="w-[40px] h-[40px] rounded-full"
          />
          <TextSemiBold title={nickName} style="text-Body-2 ml-2" />
          <TextSemiBold
            title={`· ${dayjs().to(createAt)}`}
            style="text-Body-2 ml-2 text-Gray-06"
          />
        </View>
        <ReportButton domainId={messageId!} domainType="FUNDING_MESSAGE" />
      </View>
      <TextRegular
        title={message}
        style="text-Gray-06 text-Body-2 leading-Body-2 mt-2 mx-1"
      />
    </View>
  );
};

export default FundMessage;
