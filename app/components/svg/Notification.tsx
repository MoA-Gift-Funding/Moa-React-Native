import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';

const Notification = ({
  hasUnRead,
  color,
}: {
  hasUnRead: boolean;
  color: string;
}) => {
  return (
    <Svg width="45" height="45" viewBox="0 0 41 41" fill="none">
      {hasUnRead && (
        <Circle cx="30.424" cy="10.5728" r="2" fill={color} stroke={color} />
      )}
      <Path
        d="M26.4535 22.8325L28.209 24.8501C28.2775 25.0177 28.2914 25.0734 28.2914 25.129C28.2914 25.4728 27.997 25.7734 27.6259 25.7734H23.3795H13.3902C13.0191 25.7734 12.7247 25.4728 12.7247 25.129C12.7247 24.9974 12.7442 24.9518 12.7721 24.9074L12.8039 24.8566C12.8047 24.8554 12.8054 24.8542 12.8061 24.8531C12.8069 24.8518 12.8077 24.8506 12.8085 24.8493L12.8102 24.8466L14.5627 22.8325L14.7468 22.6208V22.3402V18.9316C14.7468 16.6079 16.1679 14.6199 18.2418 13.7414C18.9048 13.4606 19.6701 13.4067 20.5404 13.4067C21.37 13.4067 22.094 13.4546 22.7238 13.7134C24.8005 14.5669 26.2693 16.5934 26.2693 18.9316V22.3402V22.6208L26.4535 22.8325Z"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M22.6418 26.5234C22.6418 27.7016 21.6867 28.6568 20.5085 28.6568C19.3302 28.6568 18.3751 27.7016 18.3751 26.5234"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
};

export default Notification;