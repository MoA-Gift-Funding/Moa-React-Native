import React, {useRef} from 'react';
import TextRegular from './TextRegular';
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';

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

const TextEditor: React.FC<TextInputGroupProps> = ({
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
  const editor = useRef();
  const handleHead = ({tintColor}) => <Text className="text-Heading-3">H</Text>;
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
          <>
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
            {/* <SafeAreaView>
              <TextRegular
                style="text-Body-1 text-black leading-Body-1 mb-1"
                title={label}
              />
              {desc && (
                <TextRegular
                  title={desc}
                  style="text-Detail-1 text-Gray-06 mb-2"
                />
              )}
              <ScrollView>
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  className={`w-[312px] h-[56px] placeholder:text-[#858585] bg-white border-[1px] border-[#D9D9D9] rounded-md px-3 text-Body-1 ${custom}`}>
                  <RichEditor
                    ref={editor}
                    placeholder="메세지 입력(최소 10자, 최대 500자)"
                    onChange={descriptionText => {
                      console.log('descriptionText:', descriptionText);
                    }}
                  />
                </KeyboardAvoidingView>
              </ScrollView>

              <RichToolbar
                editor={editor}
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.setUnderline,
                  actions.heading1,
                  actions.checkboxList,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertImage,
                ]}
                iconMap={{[actions.heading1]: handleHead}}
              />
            </SafeAreaView> */}
          </>
        )}
        name={name}
      />
      <TextRegular style="text-red-500 text-sm ml-1" title={error?.message} />
    </>
  );
};

export default TextEditor;
