import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import TextRegular from '../text/TextRegular';
import {Control, Controller} from 'react-hook-form';

const SelectButton = ({
  name,
  categories,
  control,
  rules,
}: {
  name: string;
  categories: object;
  control: Control<any>;
  rules?: any;
}) => {
  const [toggled, setToggled] = useState(false);
  return (
    <Controller
      control={control}
      rules={{
        ...rules,
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <>
          <Pressable
            className="w-[312px] h-[40px] flex justify-center border-b-2 border-Gray-02"
            onPress={() => setToggled(true)}>
            <TextRegular
              title={categories[value] || '문의 유형을 선택해주세요.'}
              style="text-Body-1"
            />
          </Pressable>
          <View className="absolute top-14 w-[312px] z-10 bg-white">
            {toggled &&
              Object.keys(categories).map(category => (
                <Pressable
                  key={category}
                  className="h-9 flex justify-center items-center"
                  onPress={() => {
                    onChange(category);
                    setToggled(false);
                  }}>
                  <TextRegular title={categories[category]} style="" />
                </Pressable>
              ))}
          </View>
        </>
      )}
      name={name}
    />
  );
};

export default SelectButton;
