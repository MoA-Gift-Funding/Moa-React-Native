import React from 'react';
import {Pressable} from 'react-native';
import TextSemiBold from '../text/TextSemiBold';
import {SubmitHandler, UseFormHandleSubmit} from 'react-hook-form';

interface NextButtonProps {
  title: string;
  onSubmit: SubmitHandler<any>;
  handleSubmit: UseFormHandleSubmit<any>;
}

const NextButton: React.FC<NextButtonProps> = ({
  onSubmit,
  title,
  handleSubmit,
}) => {
  return (
    <Pressable
      className="h-[56px] w-[312px] bg-Main-01 rounded-lg flex items-center justify-center"
      onPress={handleSubmit(onSubmit)}>
      <TextSemiBold style="text-white text-Body-1 ml-[14px]" title={title} />
    </Pressable>
  );
};
export default NextButton;
