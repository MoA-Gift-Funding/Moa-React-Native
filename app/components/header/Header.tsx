import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigationRef = useNavigation();
  return (
    <TouchableOpacity
      className="h-[48px] ml-2 flex flex-row justify-between items-center text-Heading-3"
      onPress={navigationRef.goBack}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </TouchableOpacity>
  );
}
