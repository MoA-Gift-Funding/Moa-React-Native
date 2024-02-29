import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import NextButton from '../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import ProgressBar from '../../components/bar/ProgressBar';
import LoadingBar from '../../components/bar/LoadingBar';
import useFriends from '../../hooks/friends/useFriends';
import {getContactsInfo, throttle} from '../../utils/device';

const Contact = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {handleSubmit} = useForm();
  const {syncContactsQuery} = useFriends();
  const getContacts = async () => {
    try {
      setIsLoading(true);
      const organized = await getContactsInfo();
      syncContactsQuery(organized);
    } finally {
      setIsLoading(false);
      navigation.navigate('JoinCompleted');
    }
  };
  return (
    <View className="px-6 bg-white h-full flex flex-col justify-between">
      <View>
        <ProgressBar progress={'w-4/5'} />
        {isLoading && <LoadingBar />}
        <View className="my-8 font-semibold">
          <TextSemiBold style="text-Heading-3" title="연락처를 연결하면" />
          <TextSemiBold
            style="text-Heading-3"
            title="친구에게 선물할 수 있어요."
          />
          <TextRegular
            style="text-Body-2 mt-4"
            title="연락처 연결을 통해 친구들이 원하는 선물을 구경해봐요!"
          />
        </View>
        {/* <View className="flex flex-col items-start relative mt-2">
          <Image
            className="w-[300px] h-[350px] mt-2"
            source={{
              uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1700910992/contacts_rngrw4.png',
            }}
          />
        </View> */}
      </View>
      <View className="mb-8 flex flex-col items-center">
        <Pressable
          onPress={throttle(async () => {
            navigation.navigate('JoinCompleted');
          }, 1000)}>
          <TextRegular
            style="mb-10 text-Body-2 text-Gray-06 underline"
            title="건너뛰기"
          />
        </Pressable>
        <NextButton
          title="연락처 연결하기"
          handleSubmit={handleSubmit}
          onSubmit={getContacts}
        />
      </View>
    </View>
  );
};

export default Contact;
