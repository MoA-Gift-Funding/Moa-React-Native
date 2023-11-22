import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

export default function BackHeader() {
  const navigate = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity
        className="h-[48px] ml-2 flex flex-row justify-between items-center text-Heading-3 bg-white"
        onPress={navigate.goBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
