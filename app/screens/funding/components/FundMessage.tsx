import React, {Dispatch, SetStateAction} from 'react';
import {Image, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ko from 'dayjs/locale/ko';
import {MessageStatus} from '../../../types/Funding';
import ReportAndEditButton from '../../../components/button/ReportAndEditButton';
import {httpsUrlCorrector} from '../../../utils/regex';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';
dayjs.extend(relativeTime);
dayjs.locale(ko);

const FundMessage = ({
  messageId,
  message,
  nickName,
  createAt,
  profileImageUrl,
  memberId,
  visibility,
  setMsgUpdated,
}: {
  memberId: number;
  nickName: string;
  profileImageUrl: string;
  messageId: number;
  message: string;
  createAt: string;
  visibility: MessageStatus;
  setMsgUpdated: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View className="flex flex-col border-b-2 border-Gray-01 py-4 px-6">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          {profileImageUrl ? (
            <>
              <Image
                source={{
                  uri: httpsUrlCorrector(profileImageUrl),
                }}
                className="w-[40px] h-[40px] rounded-full"
              />
              <TextSemiBold title={nickName} style="text-Body-2 ml-2" />
            </>
          ) : (
            <>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1709182365/lock_7133445_tpbspf.png',
                }}
                className="w-[35px] h-[35px] rounded-full"
              />
              <TextSemiBold title="비공개" style="text-Body-2 ml-2" />
            </>
          )}
          <TextSemiBold
            title={`· ${dayjs().to(createAt)}`}
            style="text-Body-2 mx-2 text-Gray-06"
          />
          {message && visibility === 'PRIVATE' && (
            <FontAwesomeIcon icon={faLock} color="#BDBDBD" size={14} />
          )}
        </View>
        <ReportAndEditButton
          domainId={messageId!}
          domainType="FUNDING_MESSAGE"
          memberId={memberId}
          message={message}
          messageId={messageId}
          visibility={visibility}
          setMsgUpdated={setMsgUpdated}
        />
      </View>
      {message ? (
        <TextRegular
          title={message}
          style="text-Gray-08 text-Body-2 leading-Body-2 mt-2 mx-1"
        />
      ) : (
        <TextRegular
          title="펀딩 개설자에게만 보이는 비밀 메세지예요."
          style="text-Gray-08 text-Body-2 leading-Body-2 mt-2 mx-1"
        />
      )}
    </View>
  );
};

export default FundMessage;
