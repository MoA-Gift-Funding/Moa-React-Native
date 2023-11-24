import React, {useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import TextRegular from '../../components/text/TextRegular';
import NextButton from '../../components/button/NextButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Config from 'react-native-config';

const Profile = () => {
  //   const result = launchImageLibrary({mediaType: 'photo'});
  const [imageURI, setImageURI] = useState(Config.DEFAULT_IMAGE);
  const onPress = async () => {
    const {assets} = await launchImageLibrary({mediaType: 'photo'});
    console.log(assets);
  };
  return (
    <View className="px-6 bg-white h-full flex flex-col justify-between">
      <View>
        <View className="my-10 font-semibold">
          <TextSemiBold
            style="text-Heading-3"
            title="프로필 사진을 등록해주세요."
          />
        </View>
        <View className="flex flex-col gap-2 items-center relative">
          <Image
            className="w-[200px] h-[200px]"
            source={{
              uri: imageURI,
            }}
          />
          <Pressable
            className="absolute flex items-center justify-center bottom-3 right-16 w-[60px] h-[60px] bg-Gray-10 opacity-70 rounded-full"
            onPress={onPress}>
            <FontAwesomeIcon icon={faCamera} color="white" size={25} />
          </Pressable>
        </View>
      </View>
      <View className="mb-4 flex flex-col items-center">
        <TextRegular
          style="mb-2 text-Body-2 text-Gray-06 underline"
          title="건너뛰기"
        />
        {/* <NextButton title="다음" /> */}
      </View>
    </View>
  );
};

export default Profile;
