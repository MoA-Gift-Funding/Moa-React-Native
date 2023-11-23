import React from 'react';
import TextRegular from './TextRegular';
import {TextInput} from 'react-native';
import {Control, Controller, FieldError} from 'react-hook-form';

interface TextInputGroupProps {
  name: string;
  label: string;
  placeholder?: string;
  error: FieldError | undefined;
  control: Control<any>;
  required: boolean;
}

const TextInputGroup: React.FC<TextInputGroupProps> = ({
  name,
  label,
  placeholder,
  error,
  control,
  required,
}) => {
  return (
    <>
      <TextRegular style="text-body-2 text-Gray-06" title={label} />
      <Controller
        control={control}
        rules={{
          required,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            className="w-[312px] h-[56px] bg-Gray-02 rounded-md px-3 text-body-2"
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      <TextRegular style="text-red-500 text-sm ml-1" title={error?.message} />
    </>
  );
};

export default TextInputGroup;
