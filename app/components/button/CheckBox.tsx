import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Pressable} from 'react-native';
import React from 'react';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

const CheckBox = ({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: () => void;
}) => {
  return (
    <Pressable
      className="border border-Gray-05 w-4 h-4 flex justify-center items-center rounded"
      onPress={setChecked}>
      {checked && <FontAwesomeIcon icon={faCheck} color="#FF5414" size={13} />}
    </Pressable>
  );
};

export default CheckBox;
