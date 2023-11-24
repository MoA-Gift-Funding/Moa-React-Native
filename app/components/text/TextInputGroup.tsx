import React from 'react';
import TextRegular from './TextRegular';
import {KeyboardTypeOptions, TextInput} from 'react-native';
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

interface TextInputGroupProps {
  name: string;
  label: string;
  placeholder?: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  control: Control<any>;
  rules?: any;
  regex?: any;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

const TextInputGroup: React.FC<TextInputGroupProps> = ({
  name,
  label,
  placeholder,
  error,
  control,
  rules,
  regex,
  editable,
  keyboardType,
}) => {
  return (
    <>
      <TextRegular style="text-body-2 text-Gray-06" title={label} />
      <Controller
        control={control}
        rules={{
          ...rules,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            editable={editable}
            className="w-[312px] h-[56px] bg-Gray-02 rounded-md px-3 text-body-2 text-black"
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={text => {
              let formattedText = text;
              if (rules?.maxLength && text.length > rules.maxLength.value) {
                return;
              }
              if (regex) {
                formattedText = regex(text);
              }
              onChange(formattedText);
            }}
            value={value}
            keyboardType={keyboardType}
          />
        )}
        name={name}
      />
      <TextRegular style="text-red-500 text-sm ml-1" title={error?.message} />
    </>
  );
};

export default TextInputGroup;
