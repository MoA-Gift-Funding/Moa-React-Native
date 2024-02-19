import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';
import TextSemiBold from '../text/TextSemiBold';
import TextBold from '../text/TextBold';
import TextRegular from '../text/TextRegular';

const ReportTextBtn = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <Pressable
    className="w-[312px] h-[56px] bg-Gray-02 flex justify-center rounded-lg mb-2"
    onPress={onPress}>
    <TextSemiBold title={title} style="ml-4 text-Gray-06" />
  </Pressable>
);

const ReportButton = () => {
  const handleOnModal = () => setOnModal(!onModal);
  const [onModal, setOnModal] = useState(false);
  const handleReport = () => {};
  return (
    <>
      <Pressable onPress={handleOnModal} className="px-2 py-2 relative">
        <Image
          className="w-[4px] h-[16px]"
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1708353354/moa-dots_yl6uwc.png',
          }}
        />
        <View className="absolute w-[100px] h-[50px] -bottom-14 right-0 flex justify-center items-center">
          <TextRegular title="신고하기" />
        </View>
      </Pressable>
      {onModal && (
        <Modal>
          <SafeAreaView className="h-full flex flex-col items-center justify-between">
            <View>
              <Pressable
                className="w-full flex flex-row justify-end px-4 py-2"
                onPress={handleOnModal}>
                <TextBold title="X" style="text-Gray-08 text-Heading-3" />
              </Pressable>
              <View className="mt-10 flex flex-col justify-between">
                <View className="flex flex-col items-center">
                  <TextSemiBold
                    title="메세지 신고하기"
                    style="text-Heading-3 leading-Heading-3"
                  />
                  <TextRegular
                    title="문제를 가장 잘 설명하는 옵션을 선택해주세요."
                    style="text-Body-2 leading-Body-2"
                  />
                  <View className="flex flex-col mt-6">
                    <ReportTextBtn
                      title="스팸"
                      onPress={() => setOnModal(!onModal)}
                    />
                    <ReportTextBtn
                      title="학대나 괴롭힘"
                      onPress={() => setOnModal(!onModal)}
                    />
                    <ReportTextBtn
                      title="해로운 허위 정보 및 폭력 미화"
                      onPress={() => setOnModal(!onModal)}
                    />
                    <ReportTextBtn
                      title="기타"
                      onPress={() => setOnModal(!onModal)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Pressable
              className="w-[312px] h-[56px] flex items-center justify-center bg-Gray-08 rounded-lg mb-4"
              onPress={handleOnModal}>
              <TextSemiBold title="취소" style="text-Gray-02" />
            </Pressable>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
};

export default ReportButton;
