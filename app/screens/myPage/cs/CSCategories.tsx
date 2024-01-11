import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import cls from 'classnames';

const CategoryButton = ({
  title,
  initialState,
}: {
  title: string;
  initialState: boolean;
}) => {
  const [pressed, setPressed] = useState(initialState);
  return (
    <Pressable
      className={cls(
        'flex items-center justify-center h-[32px] px-2 rounded-md',
        {'bg-Main-01': frequent},
        {'bg-Sub-01': !frequent},
      )}
      onPress={() => handlePress('frequent')}>
      <TextSemiBold
        title="자주 묻는 질문"
        style={frequent ? 'text-Body-2 text-white' : 'text-Body-2 text-Main-01'}
      />
    </Pressable>
  );
};

export default CategoryButton;
