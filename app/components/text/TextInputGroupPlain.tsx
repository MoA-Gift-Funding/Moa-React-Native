import React from 'react';
import TextRegular from './TextRegular';
import {KeyboardTypeOptions, TextInput, View} from 'react-native';
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';
import TextBold from './TextBold';

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
  client?: string;
}

const TextInputGroupPlain: React.FC<TextInputGroupProps> = ({
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
  client,
}) => {
  return (
    <View className="h-[58px] mb-2">
      <TextRegular style="text-Detail-1 text-Gray-06" title={label} />
      <Controller
        control={control}
        rules={{
          ...rules,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View className="flex flex-row items-center border-b-2 border-Gray-01 ">
            {client && (
              <View className="w-[17px] h-[17px] bg-Kakao flex items-center justify-center rounded-sm mr-2">
                <TextBold title="K" style="text-center text-Detail-1" />
              </View>
            )}
            <TextInput
              editable={editable}
              className={`h-[50px] w-[300px] text-Body-1 text-black ${custom}`}
              placeholder={placeholder}
              placeholderTextColor={'#000000'}
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
          </View>
        )}
        name={name}
      />
      <TextRegular style="text-red-500 text-sm ml-1" title={error?.message} />
    </View>
  );
};

export default TextInputGroupPlain;
