import React, {useState} from 'react';
import {Alert, Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import TextRegular from '../../components/text/TextRegular';
import NextButton from '../../components/button/NextButton';
import {launchImageLibrary} from 'react-native-image-picker';
import Config from 'react-native-config';
import {useUserContext} from '../../contexts/UserContext';
import {uploadImage} from '../../apis/image/Image';
import {useForm} from 'react-hook-form';
import {updateProfileImage} from '../../apis/user/User';

const Profile = ({navigation}) => {
  const {
    userState: {user},
  } = useUserContext();
  const [imageURI, setImageURI] = useState(
    user?.profileImage || Config.DEFAULT_IMAGE,
  );
  const {handleSubmit} = useForm();
  const onPress = async () => {
    const {assets} = await launchImageLibrary({mediaType: 'photo'});
    if (assets) {
      const file = assets[0];
      const uri = file.uri;
      const type = file.type;
      const name = file.fileName;
      const source = {
        uri,
        type,
        name,
      };
      const {secure_url, message} = await uploadImage(source);
      if (message) {
        return Alert.alert('네트워크 오류', message, [{text: '확인'}]);
      }
      setImageURI(secure_url);
    }
  };
  const handleButton = async () => {
    const res = await updateProfileImage(imageURI!);
    if (res) {
      return Alert.alert('네트워크 오류 오류', res, [{text: '확인'}]);
    }
    navigation.navigate('Contact');
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
        <View className="flex flex-col gap-2 items-center relative mt-16">
          <Image
            className="w-[200px] h-[200px] rounded-full"
            source={{
              uri:
                imageURI[4] !== 's'
                  ? `https://${imageURI?.substring(7)}`
                  : imageURI,
            }}
          />
          <Pressable
            className="absolute flex items-center justify-center bottom-3 right-16 w-[60px] h-[60px] bg-Gray-10 opacity-70 rounded-full"
            onPress={onPress}>
            <FontAwesomeIcon icon={faCamera} color="white" size={25} />
          </Pressable>
        </View>
      </View>
      <View className="mb-8 flex flex-col items-center">
        <Pressable onPress={() => navigation.navigate('Contact')}>
          <TextRegular
            style="mb-12 text-Body-2 text-Gray-06 underline"
            title="건너뛰기"
          />
        </Pressable>
        <NextButton
          title="저장하기"
          handleSubmit={handleSubmit}
          onSubmit={handleButton}
        />
      </View>
    </View>
  );
};

export default Profile;
