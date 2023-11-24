import React, {useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import TextRegular from '../../components/text/TextRegular';
import NextButton from '../../components/button/NextButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Config from 'react-native-config';
import {AdvancedImage, upload} from 'cloudinary-react-native';
import {Cloudinary} from '@cloudinary/url-gen';
import {useUserContext} from '../../contexts/UserContext';

const Profile = () => {
  const {
    userState: {user},
  } = useUserContext();
  const [imageURI, setImageURI] = useState(
    user?.profileImage || Config.DEFAULT_IMAGE,
  );
  console.log(user);

  const cld = new Cloudinary({
    cloud: {
      cloudName: Config.CLOUDINARY_NAME,
    },
    url: {
      secure: true,
    },
  });
  const onPress = async () => {
    const {assets} = await launchImageLibrary({mediaType: 'photo'});
    if (assets) {
      const uri = assets[0].uri;

      const options = {
        upload_preset: Config.CLOUDINARY_UPLOAD_PRESET,
        tag: 'profile',
        unsigned: true,
      };

      await upload(cld, {
        file: uri,
        options,
        callback: (error: any, res: any) => {
          //.. handle response
          console.log(res);
          console.log(error);
        },
      });
    }
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
            className="w-[200px] h-[200px] rounded-full"
            source={{
              uri: `https://${imageURI?.substring(7)}`,
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
