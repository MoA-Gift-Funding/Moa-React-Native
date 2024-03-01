import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TextBold from '../../../components/text/TextBold';
import TextRegular from '../../../components/text/TextRegular';
import NextButton from '../../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import TextInputGroup from '../../../components/text/TextInputGroup';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

const JoinFundMSG = ({navigation, route}) => {
  const [checked, setChecked] = useState(false);
  const {
    control,
    getValues,
    formState: {errors},
    handleSubmit,
  } = useForm({defaultValues: {message: ''}});

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="px-6 bg-white h-full flex flex-col justify-between"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-8">
            <TextBold
              title="펀딩 메세지를 남겨주세요."
              style="text-Heading-3 leading-Heading-3"
            />
            <TextRegular
              title="친구에게 축하 메세지를 남겨보세요."
              style="text-Gray-06 text-Body-2 leading-Body-2 mt-4"
            />
            <TextRegular
              title="남긴 메세지는 펀딩 상세 페이지에서 확인할 수 있어요."
              style="text-Gray-06 text-Body-2 leading-Body-2"
            />
            <View className="flex flex-col mt-10">
              <TextInputGroup
                name="message"
                label=""
                control={control}
                error={errors.message}
                placeholder="메세지 입력(최소 1자, 최대 300자)"
                custom="h-[220px] py-3"
                textAlignVertical="top"
                multiline={true}
                rules={{
                  required: {
                    value: true,
                    message: '메세지를 입력해주세요.',
                  },
                  maxLength: {
                    value: 300,
                    message: '최대 300자까지 입력 가능해요.',
                  },
                }}
              />
              <Pressable
                onPress={() => setChecked(!checked)}
                className="flex flex-row items-center">
                {checked ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    color="#212121"
                    size={26}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    color="#E0E0E0"
                    size={26}
                  />
                )}
                <TextRegular
                  title="친구만 볼 수 있게"
                  style="text-Gray-06 text-Body-1 ml-2"
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <KeyboardAvoidingView className="py-8 flex justify-center items-center">
          <NextButton
            title="다음"
            onSubmit={() =>
              navigation.navigate('JoinFundPay', {
                ...route.params,
                ...getValues(),
                visible: checked ? 'PRIVATE' : 'PUBLIC',
                isFundOwner: false,
              })
            }
            handleSubmit={handleSubmit}
          />
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default JoinFundMSG;
