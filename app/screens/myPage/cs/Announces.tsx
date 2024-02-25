import React from 'react';
import {ScrollView, View} from 'react-native';
import ToggleListItem from './ToggleListItem';
import useAnnounce from '../../../hooks/cs/useAnnounce';
import {useRefetchOnFocus} from '../../../hooks/handlers/useRefetchOnFocus';
import TextRegular from '../../../components/text/TextRegular';

const Announces = () => {
  const {AnnouncesQuery, refetchAnnouncesQuery} = useAnnounce();
  useRefetchOnFocus(refetchAnnouncesQuery);
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      <View className="border-t-2 border-Gray-02">
        {AnnouncesQuery &&
          AnnouncesQuery.map(annouce => (
            <ToggleListItem
              key={annouce.id}
              title={annouce.title}
              label={annouce.createdDate.substring(0, 10).replaceAll('-', '.')}
              content={annouce.content}
            />
          ))}
        {!AnnouncesQuery && (
          <TextRegular
            title="공지사항이 없어요🤗"
            style="text-Gray-06 text-center py-10"
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Announces;
