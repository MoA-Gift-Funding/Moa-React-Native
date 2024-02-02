import React, {Dispatch, SetStateAction} from 'react';
import {Pressable, View} from 'react-native';
import TextSemiBold from '../text/TextSemiBold';
import cls from 'classnames';

const SideToggle = ({
  state,
  onPress,
  leftTxt,
  rightTxt,
}: {
  state: boolean;
  onPress: Dispatch<SetStateAction<boolean>>;
  leftTxt: string;
  rightTxt: string;
}) => {
  return (
    <View className="flex flex-row items-center h-[48px] border-b-2 border-Gray-02 px-6">
      <Pressable
        className={cls('h-[48px] flex justify-center items-center flex-1', {
          'border-b-2 border-Main-01': state,
        })}
        onPress={() => onPress(true)}>
        <TextSemiBold
          title={leftTxt}
          style={cls('text-Body-2', {'text-Gray-06': !state})}
        />
      </Pressable>
      <Pressable
        className={cls('h-[48px] flex justify-center items-center flex-1', {
          'border-b-2 border-Main-01': !state,
        })}
        onPress={() => onPress(false)}>
        <TextSemiBold
          title={rightTxt}
          style={cls('text-Body-2', {'text-Gray-06': state})}
        />
      </Pressable>
    </View>
  );
};

export default SideToggle;
