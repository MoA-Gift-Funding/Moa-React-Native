import React, {Dispatch, SetStateAction, useState} from 'react';
import {Image, Modal, Pressable, SafeAreaView, View} from 'react-native';
import TextSemiBold from '../text/TextSemiBold';
import TextRegular from '../text/TextRegular';
import useFunding from '../../hooks/fundings/useFunding';
import {throttle} from '../../utils/device';
import {useUserContext} from '../../contexts/UserContext';
import cls from 'classnames';

const ReportTextBtn = ({
  state,
  setState,
  txt,
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  txt: string;
}) => {
  return (
    <Pressable
      className={cls('w-[312px] h-[56px] flex justify-center rounded-lg mb-2', {
        'bg-Gray-08': state === txt,
        'bg-Gray-02': state !== txt,
      })}
      onPress={() => setState(txt)}>
      <TextSemiBold
        title={txt}
        style={cls(
          'ml-4',
          {'text-Gray-01': state === txt},
          {'text-Gray-06': state !== txt},
        )}
      />
    </Pressable>
  );
};

const ReportAndEditButton = ({
  domainId,
  domainType,
  memberId,
}: {
  domainId: number;
  domainType: 'FUNDING' | 'FUNDING_MESSAGE';
  memberId?: number;
}) => {
  const handleReportModal = () => {
    setOnPressed(false);
    setOnModal(true);
  };
  const {
    userState: {user},
  } = useUserContext();
  const [onModal, setOnModal] = useState(false);
  const [onPressed, setOnPressed] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const {reportPostQuery} = useFunding();
  const handleReport = async (content: string) => {
    if (!selectedContent) {
      return;
    }
    try {
      await reportPostQuery({domainId, domainType, content});
    } finally {
      setOnModal(false);
    }
  };
  return (
    <>
      <Pressable
        onPress={() => setOnPressed(true)}
        className="px-2 py-2 relative">
        <Image
          className="w-[4px] h-[16px]"
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1708353354/moa-dots_yl6uwc.png',
          }}
        />
      </Pressable>
      <Modal transparent={true} visible={onPressed}>
        <Pressable
          className="flex justify-end items-center flex-1 bg-Gray-08 opacity-70"
          onPress={() => setOnPressed(false)}
        />
        {domainType === 'FUNDING' && (
          <Pressable
            onPress={handleReportModal}
            className="w-full flex flex-row items-center justify-around  bg-white h-24">
            <TextRegular title="신고" style="text-Heading-4 text-Gray-10" />
          </Pressable>
        )}
        {domainType === 'FUNDING_MESSAGE' && (
          <>
            {memberId === user?.id && (
              <Pressable
                onPress={() => {}}
                className="w-full flex flex-row items-center justify-around bg-white h-20">
                <TextRegular title="수정" style="text-Heading-4 text-Gray-10" />
              </Pressable>
            )}
            <Pressable
              onPress={handleReportModal}
              className="w-full flex flex-row items-center justify-around bg-white h-20 border-t border-Gray-03">
              <TextRegular title="신고" style="text-Heading-4 text-Gray-10" />
            </Pressable>
          </>
        )}
      </Modal>
      <Modal visible={onModal}>
        <SafeAreaView className="h-full flex flex-col items-center justify-between">
          <View className="mt-10 flex flex-col justify-between">
            <View className="flex flex-col items-center">
              <TextSemiBold
                title={
                  domainType === 'FUNDING' ? '펀딩 신고하기' : '메세지 신고하기'
                }
                style="text-Heading-3 leading-Heading-3"
              />
              <TextRegular
                title="문제를 가장 잘 설명하는 옵션을 선택해주세요."
                style="text-Body-2 leading-Body-2"
              />
              <View className="flex flex-col mt-6">
                <ReportTextBtn
                  state={selectedContent}
                  setState={setSelectedContent}
                  txt="스팸"
                />
                <ReportTextBtn
                  state={selectedContent}
                  setState={setSelectedContent}
                  txt="학대나 괴롭힘"
                />
                <ReportTextBtn
                  state={selectedContent}
                  setState={setSelectedContent}
                  txt="해로운 허위 정보 및 폭력 미화"
                />
                <ReportTextBtn
                  state={selectedContent}
                  setState={setSelectedContent}
                  txt="기타"
                />
              </View>
            </View>
          </View>
          <View className="flex flex-row mb-4 items-center">
            <Pressable
              className="w-[210px] h-[56px] flex items-center justify-center bg-Gray-04 rounded-lg"
              onPress={throttle(() => handleReport(selectedContent), 1000)}>
              <TextSemiBold title="신고하기" style="text-Gray-07 text-Body-1" />
            </Pressable>
            <Pressable
              className="w-[110px] h-[56px] flex items-center justify-center bg-Gray-03 rounded-lg ml-2"
              onPress={() => {
                setSelectedContent('');
                setOnModal(false);
              }}>
              <TextSemiBold title="취소" style="text-Gray-07 text-Body-1" />
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default ReportAndEditButton;
