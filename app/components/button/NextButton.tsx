import React from 'react';
import {Pressable} from 'react-native';
import TextSemiBold from '../text/TextSemiBold';

interface NextButtonProps {
  title: string;
  onPressFn?: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({onPressFn, title}) => {
  return (
    <Pressable
      className="h-[56px] w-[312px] bg-Main-01 rounded-lg flex items-center justify-center"
      onPress={onPressFn}>
      <TextSemiBold style="text-white text-Body-1 ml-[14px]" title={title} />
    </Pressable>
  );
};
export default NextButton;
