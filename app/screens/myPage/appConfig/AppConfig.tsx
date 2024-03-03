import React, {useState} from 'react';
import {Alert, Pressable, Switch, View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import {
  getCurrentAppVersion,
  getDeviceToken,
  getLatestAppVersion,
  throttle,
} from '../../../utils/device';
import useNotifications from '../../../hooks/notification/useNotifications';
import useUser from '../../../hooks/user/useUser';
import LoadingBar from '../../../components/bar/LoadingBar';

const AppConfig = () => {
  const {
    notificationStatusQuery,
    permitNotificationQuery,
    disallowNotificationQuery,
  } = useNotifications();
  const [allowed, setAllowed] = useState(notificationStatusQuery);
  const [isLoading, setIsLoading] = useState(false);
  const {deactivateUserQuery} = useUser();

  const handlePermitNotiBtn = async () => {
    if (allowed) {
      await disallowNotificationQuery();
      setAllowed(false);
    } else {
      const token = await getDeviceToken();
      await permitNotificationQuery(token!);
      setAllowed(true);
    }
  };

  const currentVersion = getCurrentAppVersion();
  const latestVersion = getLatestAppVersion();

  const handleUpdateBtn = async () => {};

  const handleDeactivateUser = async () => {
    Alert.alert(
      '회원 탈퇴 하시겠습니까?',
      '회원 탈퇴시, 주문, 결제, 개인 정보가 모두 삭제되며 조회 및 취소가 불가합니다. 동의하시면 탈퇴 버튼을 눌러주세요.',
      [
        {text: '취소'},
        {
          text: '탈퇴 하기',
          onPress: async () => {
            try {
              setIsLoading(true);
              await deactivateUserQuery();
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
    );
  };
  return (
    <View className="h-full justify-between">
      <View>
        {isLoading && <LoadingBar />}
        <View className="border-Gray-02 border-t-2 bg-white">
          <View className="h-[62px] px-6 flex justify-center border-b-2 border-Gray-02">
            <TextRegular title="알림 설정" style="text-Gray-06" />
          </View>
          <View className="h-[62px] flex justify-center items-center">
            <View className="w-[312px] flex flex-row items-center justify-between">
              <TextRegular
                title="푸쉬 알림 설정"
                style="text-Gray-10 text-Body-1 "
              />
              <Switch
                trackColor={{false: '#9E9E9E', true: '#FF5414'}}
                thumbColor="white"
                ios_backgroundColor="#9E9E9E"
                onValueChange={handlePermitNotiBtn}
                value={notificationStatusQuery}
              />
            </View>
          </View>
        </View>
        <View className="mt-4 bg-white">
          <View className="h-[62px] px-6 flex justify-center border-b-2 border-Gray-02">
            <TextRegular title="버전 정보" style="text-Gray-06" />
          </View>
          <View className="h-[62px] flex items-center justify-center border-b-2 border-Gray-02">
            <View className="flex flex-row items-center justify-between w-[312px]">
              <View className="flex flex-row">
                <TextRegular
                  title="현재 버전"
                  style="text-Gray-10 text-Body-1"
                />
                <TextRegular
                  title={currentVersion}
                  style="text-Gray-10 text-Body-1 ml-2"
                />
              </View>
              <View className="flex flex-row">
                <Pressable onPress={() => {}}>
                  <TextRegular
                    title="업데이트"
                    style="text-Gray-06 text-Body-1"
                  />
                </Pressable>
                <TextRegular
                  title={typeof latestVersion === 'object' || currentVersion}
                  style="text-Gray-06 ml-1 text-Body-1"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Pressable
        className="mb-8 flex items-center justify-center"
        onPress={throttle(handleDeactivateUser, 1000)}>
        <TextRegular title="회원 탈퇴" style="text-Gray-06 underline" />
      </Pressable>
    </View>
  );
};

export default AppConfig;
