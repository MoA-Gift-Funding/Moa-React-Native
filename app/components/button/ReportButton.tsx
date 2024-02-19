import React, {useState} from 'react';
import {Image, Modal, Pressable, SafeAreaView, View} from 'react-native';
import TextSemiBold from '../text/TextSemiBold';
import TextBold from '../text/TextBold';
import TextRegular from '../text/TextRegular';

const ReportButton = () => {
  const handleReportBtn = () => {};
  const [onModal, setOnModal] = useState(true);
  return (
    <>
      <Pressable onPress={handleReportBtn}>
        <Image
          className="w-[4px] h-[16px]"
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1708353354/moa-dots_yl6uwc.png',
          }}
        />
      </Pressable>
      {onModal && (
        <Modal>
          <SafeAreaView className="flex flex-col items-center">
            <Pressable className="w-full flex flex-row justify-end px-4 py-2">
              <TextBold title="X" style="text-Gray-08 text-Heading-3" />
            </Pressable>
            <View className="mt-14 flex flex-col items-center">
              <TextSemiBold
                title="메세지 신고하기"
                style="text-Heading-3 leading-Heading-3"
              />
              <TextRegular
                title="문제를 가장 잘 설명하는 옵션을 선택해주세요."
                style="text-Body-2 leading-Body-2"
              />
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
};

export default ReportButton;
