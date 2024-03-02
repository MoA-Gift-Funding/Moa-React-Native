import React, {useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TextSemiBold from '../text/TextSemiBold';
import TextBold from '../text/TextBold';
import TextRegular from '../text/TextRegular';
import useFunding from '../../hooks/fundings/useFunding';
import {throttle} from '../../utils/device';
const ReportTextBtn = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <Pressable
    className="w-[312px] h-[56px] bg-Gray-02 flex justify-center rounded-lg mb-2"
    onPress={throttle(onPress, 1000)}>
    <TextSemiBold title={title} style="ml-4 text-Gray-06" />
  </Pressable>
);

const ReportButton = ({
  domainId,
  domainType,
}: {
  domainId: number;
  domainType: 'FUNDING' | 'FUNDING_MESSAGE';
}) => {
  const handleOnModal = () => {
    Alert.alert(
      domainType === 'FUNDING'
        ? '펀딩을 신고하시겠어요?'
        : '메세지를 신고하시겠어요?',
      '',
      [{text: '신고하기', onPress: () => setOnModal(true)}, {text: '취소'}],
    );
  };
  const [onModal, setOnModal] = useState(false);
  const [onPressed, setOnPressed] = useState(false);
  const {reportPostQuery} = useFunding();
  const handleReport = async (content: string) => {
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
            onPress={handleOnModal}
            className="w-full flex flex-row items-center justify-around  bg-white h-20">
            <TextRegular title="신고" style="text-Heading-4 text-Gray-10" />
          </Pressable>
        )}
        {domainType === 'FUNDING_MESSAGE' && (
          <>
            <Pressable
              onPress={handleOnModal}
              className="w-full flex flex-row items-center justify-around bg-white h-20">
              <TextRegular title="수정" style="text-Heading-4 text-Gray-10" />
            </Pressable>
            <Pressable
              onPress={handleOnModal}
              className="w-full flex flex-row items-center justify-around bg-white h-20 border-t border-Gray-03">
              <TextRegular title="신고" style="text-Heading-4 text-Gray-10" />
            </Pressable>
          </>
        )}
      </Modal>
      <Modal visible={onModal}>
        <SafeAreaView className="h-full flex flex-col items-center justify-between">
          <View>
            <Pressable
              className="w-full flex flex-row justify-end px-4 py-2"
              onPress={() => setOnModal(false)}>
              <TextBold title="X" style="text-Gray-08 text-Heading-3" />
            </Pressable>
            <View className="mt-10 flex flex-col justify-between">
              <View className="flex flex-col items-center">
                <TextSemiBold
                  title={
                    domainType === 'FUNDING'
                      ? '펀딩 신고하기'
                      : '메세지 신고하기'
                  }
                  style="text-Heading-3 leading-Heading-3"
                />
                <TextRegular
                  title="문제를 가장 잘 설명하는 옵션을 선택해주세요."
                  style="text-Body-2 leading-Body-2"
                />
                <View className="flex flex-col mt-6">
                  <ReportTextBtn
                    title="스팸"
                    onPress={() => handleReport('스팸')}
                  />
                  <ReportTextBtn
                    title="학대나 괴롭힘"
                    onPress={() => handleReport('학대나 괴롭힘')}
                  />
                  <ReportTextBtn
                    title="해로운 허위 정보 및 폭력 미화"
                    onPress={() =>
                      handleReport('해로운 허위 정보 및 폭력 미화')
                    }
                  />
                  <ReportTextBtn
                    title="기타"
                    onPress={() => handleReport('기타')}
                  />
                </View>
              </View>
            </View>
          </View>
          <Pressable
            className="w-[312px] h-[56px] flex items-center justify-center bg-Gray-08 rounded-lg mb-4"
            onPress={() => setOnModal(false)}>
            <TextSemiBold title="취소" style="text-Gray-02" />
          </Pressable>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default ReportButton;
