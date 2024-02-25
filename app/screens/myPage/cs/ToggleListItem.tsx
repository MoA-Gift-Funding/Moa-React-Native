import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import TextSemiBold from '../../../components/text/TextSemiBold';

const ToggleListItem = ({
  title,
  content,
  category,
  label,
}: {
  title: string;
  content: string;
  category?: string;
  label: string;
}) => {
  const [toggled, setToggled] = useState(false);
  return (
    <View>
      <Pressable
        className="p-5 border-b-2 border-Gray-02"
        onPress={() => setToggled(!toggled)}>
        <TextRegular title={label} style="text-Gray-06 text-Detail-1" />
        {toggled && <TextSemiBold title={title} style="text-Body-2 mt-2" />}
        {!toggled && <TextRegular title={title} style="text-Body-2 mt-2" />}
      </Pressable>
      {toggled && (
        <View className="bg-Gray-02 p-5">
          {category && (
            <TextRegular title={category} style="text-Body-2 mt-2" />
          )}
          <TextRegular
            title={content}
            style="text-Body-2 leading-Body-2 min-h-[100px]"
          />
        </View>
      )}
    </View>
  );
};

export default ToggleListItem;
