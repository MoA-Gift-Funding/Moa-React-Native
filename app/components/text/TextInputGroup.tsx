import React from 'react';
import TextRegular from './TextRegular';
import {TextInput} from 'react-native';

interface TextInputGroupProps {
  label: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const TextInputGroup: React.FC<TextInputGroupProps> = ({
  label,
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <>
      <TextRegular style="text-body-2 text-Gray-06" title={label} />
      <TextInput
        className="w-[312px] h-[56px] bg-Gray-02 rounded-md indent-[14px] text-body-2"
        placeholder={placeholder}
        value={value}
        onChangeText={text => setValue(text)}
      />
      <TextRegular style="text-red-500 text-sm ml-1" title={error} />
    </>
  );
};

export default TextInputGroup;
