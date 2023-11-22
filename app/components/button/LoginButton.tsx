import React from 'react';
import {Pressable} from 'react-native';
import TextRegular from '../text/TextRegular';

interface LoginButtonProps {
  buttonStyle?: string;
  textStyle?: string;
  title: string;
  onPressFn?: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  buttonStyle,
  textStyle,
  title,
  onPressFn,
}) => {
  return (
    <Pressable
      className={`w-[312px] h-[56px] rounded-md flex justify-center ${buttonStyle}`}
      onPress={onPressFn}>
      <TextRegular style={`${textStyle} text-Body-1 ml-[14px]`} title={title} />
    </Pressable>
  );
};
export default LoginButton;
