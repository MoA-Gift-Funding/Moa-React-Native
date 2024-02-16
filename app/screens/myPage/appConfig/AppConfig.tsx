import React, {useState} from 'react';
import {Pressable, Switch, View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import {getCurrentAppVersion, getLatestAppVersion} from '../../../utils/device';

const AppConfig = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const currentVersion = getCurrentAppVersion();
  // const latestVersion = getLatestAppVersion();
  const handleUpdateBtn = async () => {};
  return (
    <View className="">
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
              onValueChange={() => setIsEnabled(!isEnabled)}
              value={isEnabled}
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
              <TextRegular title="현재 버전" style="text-Gray-10 text-Body-1" />
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
                title={'1.1'}
                style="text-Gray-06 ml-1 text-Body-1"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AppConfig;
