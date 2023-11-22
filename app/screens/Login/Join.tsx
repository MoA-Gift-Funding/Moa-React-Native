import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import NextButton from '../../components/button/NextButton';
import TextInputGroup from '../../components/text/TextInputGroup';

export default function Join() {
  const [nickName, setNickName] = useState('이수진');
  const [bDay, setBDay] = useState('0520');
  const [bYear, setBYear] = useState('1993');
  const [birthday, setBirthday] = useState('19930520');
  const [mobile, setMobile] = useState('010-4558-9598');
  const [errors, setErrors] = useState<any>({});
  return (
    <View className="px-6 bg-white h-full flex flex-col">
      <View className="my-10">
        <TextSemiBold style="text-Heading-3 text-black" title="아래 정보로" />
        <TextSemiBold
          style="text-Heading-3 text-black"
          title="가입을 진행합니다."
        />
      </View>
      <View className="flex flex-col gap-4">
        <View>
          <TextInputGroup
            label="닉네임"
            placeholder={nickName}
            value={nickName}
            setValue={setNickName}
            error={errors.nickName}
          />
        </View>
        <View>
          <TextInputGroup
            label="전화번호"
            placeholder={mobile}
            value={mobile}
            setValue={setMobile}
            error={errors.mobile}
          />
        </View>
        <View>
          <TextInputGroup
            label="생년월일"
            placeholder={birthday}
            value={birthday}
            setValue={setBirthday}
            error={errors.bDay}
          />
        </View>
      </View>
      <View className="mt-auto mb-10">
        <NextButton title="다음" />
      </View>
    </View>
  );
}
