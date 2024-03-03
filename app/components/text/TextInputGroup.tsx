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
  multiline?: boolean;
  custom?: string;
  textAlignVertical?: 'top' | 'auto' | 'bottom' | 'center';
  autoFocus?: boolean;
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
  multiline,
  custom,
  textAlignVertical,
  autoFocus,
}) => {
  return (
    <>
      <TextRegular style="text-Body-2 text-Gray-06" title={label} />
      <Controller
        control={control}
        rules={{
          ...rules,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            autoFocus={autoFocus}
            editable={editable}
            className={`w-[312px] h-[56px] rounded-md px-3 py-3 text-Body-1 text-black placeholder:text-[#858585] bg-Gray-02 ${custom}`}
            placeholder={placeholder}
            onBlur={onBlur}
            textAlignVertical={textAlignVertical}
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

export default TextInputGroup;
