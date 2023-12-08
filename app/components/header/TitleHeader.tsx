import {faChevronLeft, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import TextSemiBold from '../text/TextSemiBold';

const TitleHeader = () => {
  const navigate = useNavigation();
  const route = useRoute();
  const {headerTitle, search} = route.params;
  return (
    <SafeAreaView>
      <View className="h-[48px] flex flex-row justify-between items-center bg-white">
        <TouchableOpacity className="p-4" onPress={navigate.goBack}>
          <FontAwesomeIcon icon={faChevronLeft} size={21} />
        </TouchableOpacity>
        <TextSemiBold
          title={headerTitle}
          style="text-Heading-4 leading-Heading-4"
        />
        <View className="p-4">
          {search && (
            <TouchableOpacity onPress={() => {}}>
              <FontAwesomeIcon icon={faSearch} size={21} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TitleHeader;
