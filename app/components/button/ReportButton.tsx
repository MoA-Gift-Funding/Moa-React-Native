import React from 'react';
import {Image, Pressable} from 'react-native';

const ReportButton = () => {
  return (
    <Pressable>
      <Image
        className="w-[4px] h-[16px]"
        source={{
          uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1708353354/moa-dots_yl6uwc.png',
        }}
      />
    </Pressable>
  );
};

export default ReportButton;
