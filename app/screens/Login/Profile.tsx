import React, {useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import NextButton from '../../components/button/NextButton';
import {launchImageLibrary} from 'react-native-image-picker';
import Config from 'react-native-config';
import {useUserContext} from '../../contexts/UserContext';
import {useForm} from 'react-hook-form';
import ProgressBar from '../../components/bar/ProgressBar';
import LoadingBar from '../../components/bar/LoadingBar';
import useUser from '../../hooks/user/useUser';
import {httpsUrlCorrector} from '../../utils/regex';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    userState: {user},
    dispatch,
  } = useUserContext();
  const [imageURI, setImageURI] = useState(
    user?.profileImageUrl || Config.DEFAULT_IMAGE,
  );
  const {updateProfileImageQuery, updateUserQuery} = useUser();
  const {handleSubmit} = useForm();
  const onPress = async () => {
    setIsLoading(true);
    const {assets} = await launchImageLibrary({mediaType: 'photo'});
    if (assets) {
      const file = assets[0];
      const uri = file.uri;
      const name = file.fileName!;
      const getBlob = async (fileUri: string) => {
        const resp = await fetch(fileUri);
        const imageBody = await resp.blob();
        return imageBody;
      };
      const imageBody = await getBlob(uri!);
      const profileImageUrl = await updateProfileImageQuery({imageBody, name});
      setIsLoading(false);
      setImageURI(profileImageUrl || imageURI);
      dispatch({
        type: 'LOGIN',
        payload: {...user!, profileImageUrl},
      });
    }
  };
  const handleButton = async () => {
    const {birthday, birthyear, profileImageUrl, nickname} = user;
    updateUserQuery({birthday, birthyear, profileImageUrl, nickname});
  };
  return (
    <View className="px-6 bg-white h-full flex flex-col justify-between">
      <View>
        <ProgressBar progress={'w-3/5'} />
        {isLoading && <LoadingBar />}
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
              uri: httpsUrlCorrector(imageURI),
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
        <NextButton
          title="다음"
          handleSubmit={handleSubmit}
          onSubmit={handleButton}
        />
      </View>
    </View>
  );
};

export default Profile;
