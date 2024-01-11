import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import TextSemiBold from '../../../components/text/TextSemiBold';
import {Notice} from '../../../types/CS';

const ToggleListItem = ({title, content, label, category}: Notice) => {
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
          <TextRegular title={category} style="text-Body-2 mt-2" />
          <TextRegular title={content} style="text-Body-2 leading-Body-2" />
        </View>
      )}
    </View>
  );
};

export default ToggleListItem;
