import React, {useState} from 'react';
import {Switch, View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import VersionCheck from 'react-native-version-check';

const AppConfig = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  console.log(VersionCheck.getCurrentVersion()); // 0.1.1
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
          <TextRegular title="현재 버전" style="text-Gray-10 text-Body-1" />
        </View>
      </View>
    </View>
  );
};

export default AppConfig;
