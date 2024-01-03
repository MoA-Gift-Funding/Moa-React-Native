import React, {useState} from 'react';
import {Alert, Image, Pressable, View} from 'react-native';
import {useUserContext} from '../../contexts/UserContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImage} from '../../apis/cloudinary/Image';
import Config from 'react-native-config';
import TextRegular from '../../components/text/TextRegular';
import ProfileInfo from './components/ProfileInfo';
import {autoHyphenPhoneNumber, autoSlashBirthday} from '../../utils/regex';
import TextInputGroupWhite from '../../components/text/textInputGroupWhite';
import {useForm} from 'react-hook-form';
import TextInputGroupPlain from '../../components/text/TextInputGroupPlain';

const MyPageDetail = () => {
  const {
    formState: {errors},
    control,
  } = useForm();
  const {
    userState: {user},
  } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [imageURI, setImageURI] = useState(user?.profileImage);
  const onPress = async () => {
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
      setIsLoading(false);
      if (message) {
        return Alert.alert('네트워크 오류', message, [{text: '확인'}]);
      }
      setImageURI(secure_url);
    }
  };
  return (
    <View className="h-full border-t-2 border-Gray-01 bg-white">
      <View className="flex flex-col gap-2 items-center relative py-8">
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
      <View className="px-6">
        <TextInputGroupPlain
          label="닉네임"
          name="nickname"
          placeholder={user?.nickname}
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
          placeholder={user?.email}
          error={errors.email}
          control={control}
          rules={{
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          }}
        />
        <TextInputGroupPlain
          label="전화번호"
          name="phoneNumber"
          placeholder={user?.phoneNumber}
          error={errors.phoneNumber}
          control={control}
          regex={autoHyphenPhoneNumber}
          rules={{
            required: '전화번호는 필수 입력 사항이예요.',
            maxLength: {
              value: 13,
              mesaage: '13자리 이상 입력이 불가해요.',
            },
            pattern: {
              value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
              message: '전화번호 형식에 맞지 않아요.',
            },
          }}
          keyboardType={'number-pad'}
        />
        <TextInputGroupPlain
          label="생년월일"
          name="fullBirthday"
          placeholder={autoSlashBirthday(user?.birthyear + user?.birthday)}
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
    </View>
  );
};

export default MyPageDetail;
