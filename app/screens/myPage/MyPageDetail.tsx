import React, {useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useUserContext} from '../../contexts/UserContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImage} from '../../apis/cloudinary/Image';
import {autoSlashBirthday} from '../../utils/regex';
import {useForm} from 'react-hook-form';
import TextInputGroupPlain from './components/TextInputGroupPlain';
import LoadingBar from '../../components/bar/LoadingBar';
import NextButton from '../../components/button/NextButton';
import {updateUserProfile} from '../../apis/user/User';

const MyPageDetail = () => {
  const {
    userState: {user},
    dispatch,
  } = useUserContext();
  const {nickname, phoneNumber, birthday, birthyear, email} = user;
  const [isLoading, setIsLoading] = useState(false);
  const [imageURI, setImageURI] = useState(user?.profileImage);
  const {
    formState: {errors},
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      nickname,
      email,
      phoneNumber,
      birthday,
      birthyear,
      fullBirthday: autoSlashBirthday(`${birthyear}${birthday}`),
    },
  });
  const onPress = async () => {
    try {
      setIsLoading(true);
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data: {
    birthday: string;
    birthyear: string;
    nickname: string;
    fullBirthday: string;
  }) => {
    setIsLoading(true);
    try {
      const bdayList = data.fullBirthday.split('/');
      const updated = await updateUserProfile({
        ...data,
        birthyear: bdayList[0],
        birthday: `${bdayList[1]}${bdayList[2]}`,
      });
      dispatch({
        type: 'LOGIN',
        payload: {...updated},
      });
      Alert.alert('', '회원 정보가 변경되었습니다!');
    } catch (error) {
      Alert.alert('네트워크 에러', '다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="h-full flex flex-col bg-white justify-between">
        <ScrollView
          className="border-t-2 border-Gray-01"
          showsVerticalScrollIndicator={false}>
          {isLoading && <LoadingBar />}
          <View className="flex flex-col items-center relative py-8">
            <Image
              className="w-[100px] h-[100px] rounded-full"
              source={{
                uri:
                  imageURI[4] !== 's'
                    ? `https://${imageURI?.substring(7)}`
                    : imageURI,
              }}
            />
            <Pressable
              className="absolute flex items-center justify-center bottom-7 right-[134px] w-[32px] h-[32px] bg-Gray-10 opacity-70 rounded-full"
              onPress={onPress}>
              <FontAwesomeIcon icon={faCamera} color="#F0F0F0" size={15} />
            </Pressable>
          </View>
          <View className="p-6">
            <TextInputGroupPlain
              label="닉네임"
              name="nickname"
              error={errors.nickname}
              control={control}
              rules={{
                required: '닉네임은 필수 입력 사항이예요.',
                maxLength: {
                  value: 20,
                  message: '최대 20자까지 입력 가능해요.',
                },
              }}
            />
            <TextInputGroupPlain
              label="로그인 계정"
              name="email"
              client="Kakao"
              error={errors.email}
              control={control}
              editable={false}
            />
            <TextInputGroupPlain
              label="전화번호"
              name="phoneNumber"
              error={errors.phoneNumber}
              control={control}
              editable={false}
            />
            <TextInputGroupPlain
              label="생년월일"
              name="fullBirthday"
              error={errors.fullBirthday}
              control={control}
              regex={autoSlashBirthday}
              rules={{
                required: '생년월일은 필수 입력 사항이예요.',
                maxLength: {
                  value: 10,
                  message: '생년월일은 8자만 입력 가능해요.',
                },
                minLength: {
                  value: 10,
                  message: '1월은 01과 같은 형식으로 입력해주세요.',
                },
                pattern: {
                  value:
                    /(19\d\d|20[01]\d|202[0-2])[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])/,
                  message: '올바른 생년월일을 입력해주세요.',
                },
              }}
              keyboardType={'number-pad'}
            />
          </View>
        </ScrollView>
        <View className="mb-8 flex justify-center items-center">
          <NextButton
            title="저장"
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default MyPageDetail;
