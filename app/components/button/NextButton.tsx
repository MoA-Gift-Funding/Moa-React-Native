import React, {useCallback} from 'react';
import {Pressable} from 'react-native';
import TextSemiBold from '../text/TextSemiBold';
import {SubmitHandler, UseFormHandleSubmit} from 'react-hook-form';
import {throttle} from '../../utils/device';

interface NextButtonProps {
  title: string;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: SubmitHandler<any>;
  style?: any;
}

const NextButton: React.FC<NextButtonProps> = ({
  onSubmit,
  title,
  handleSubmit,
  style,
}) => {
  const handleOnPress = useCallback(
    () => throttle(() => handleSubmit(onSubmit), 1000),
    [handleSubmit, onSubmit],
  );
  return (
    <Pressable
      className={`h-[56px] w-[312px] bg-Main-01 rounded-lg flex items-center justify-center ${style}`}
      onPress={handleOnPress}>
      <TextSemiBold style="text-white text-Body-1 ml-[14px]" title={title} />
    </Pressable>
  );
};
export default NextButton;
