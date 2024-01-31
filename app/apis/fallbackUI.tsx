import React from 'react';
import {ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NextButton from '../components/button/NextButton';
import {useForm} from 'react-hook-form';
import TextSemiBold from '../components/text/TextSemiBold';
// import TextRegular from '../components/text/TextRegular';

const FallbackUI = ({error, resetErrorBoundary}) => {
  const {handleSubmit} = useForm();
  return (
    <ImageBackground
      source={{
        uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701673489/moa-home_kbcww2.png',
      }}
      className="w-full h-full">
      <SafeAreaView className="h-full flex flex-col justify-center items-center">
        {/* <TextRegular title={error.message} style="text-Gray-01 mb-2" /> */}
        <TextSemiBold
          title="에러가 발생했어요!"
          style="text-Body-1 text-Gray-02 mb-2"
        />
        <TextSemiBold
          title="문제가 지속시에는 고객센터로 연락주세요🙏🏻"
          style="text-Body-2 text-Gray-02 mb-4"
        />
        <NextButton
          handleSubmit={handleSubmit}
          onSubmit={resetErrorBoundary}
          title="돌아가기"
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default FallbackUI;
