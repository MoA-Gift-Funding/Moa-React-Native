import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

export default function BackHeader() {
  const navigate = useNavigation();
  return (
    <SafeAreaView>
      <View className="h-[48px] flex justify-center items-start bg-white">
        <TouchableOpacity className="p-4" onPress={navigate.goBack}>
          <FontAwesomeIcon icon={faChevronLeft} size={21} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
