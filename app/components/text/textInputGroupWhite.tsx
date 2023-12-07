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
  custom?: string;
  multiline?: boolean;
  desc?: string;
  textAlignVertical?: 'top' | 'auto' | 'bottom' | 'center';
}

const TextInputGroupWhite: React.FC<TextInputGroupProps> = ({
  name,
  label,
  placeholder,
  error,
  control,
  rules,
  regex,
  editable,
  keyboardType,
  custom,
  multiline,
  desc,
  textAlignVertical,
}) => {
  return (
    <>
      <TextRegular
        style="text-Body-1 text-black leading-Body-1 mb-1"
        title={label}
      />
      {desc && (
        <TextRegular title={desc} style="text-Detail-1 text-Gray-06 mb-2" />
      )}
      <Controller
        control={control}
        rules={{
          ...rules,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            editable={editable}
            textAlignVertical={textAlignVertical}
            className={`w-[312px] h-[56px] placeholder:text-[#858585] bg-white border-[1px] border-[#D9D9D9] rounded-md px-3 text-Body-1 ${custom}`}
            placeholder={placeholder}
            onBlur={onBlur}
            multiline={multiline}
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

export default TextInputGroupWhite;
