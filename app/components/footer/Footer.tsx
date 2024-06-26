import React from 'react';
import {Platform, Pressable, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import TextRegular from '../text/TextRegular';
import {useNavigation} from '@react-navigation/native';

const Footer = ({screen}: {screen: 'MyPage' | 'Home' | 'Store'}) => {
  const navigation = useNavigation();
  return (
    <View
      className={Platform.select({
        ios: 'sticky bottom-0 bg-white w-full h-[90px] pb-2 flex flex-row items-center justify-around',
        android:
          'sticky bottom-0 bg-white w-full h-[70px] flex flex-row items-center justify-around',
      })}>
      <Pressable
        className="flex flex-col items-center w-[72px]"
        onPress={() => navigation.navigate('HomeScreen')}>
        <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
          <Path
            d="M12.97 3.08997C12.699 2.86023 12.3553 2.73413 12 2.73413C11.6447 2.73413 11.301 2.86023 11.03 3.08997L3.53 9.45297C3.36393 9.59377 3.23049 9.76903 3.13897 9.96658C3.04744 10.1641 3.00002 10.3792 3 10.597V20C3 20.3978 3.15804 20.7793 3.43934 21.0606C3.72064 21.3419 4.10218 21.5 4.5 21.5H9.25C9.44891 21.5 9.63968 21.421 9.78033 21.2803C9.92098 21.1397 10 20.9489 10 20.75V14.5H14V20.75C14 21.164 14.336 21.5 14.75 21.5H19.5C19.8978 21.5 20.2794 21.3419 20.5607 21.0606C20.842 20.7793 21 20.3978 21 20V10.597C21 10.3792 20.9526 10.1641 20.861 9.96658C20.7695 9.76903 20.6361 9.59377 20.47 9.45297L12.97 3.08997Z"
            fill={screen === 'Home' ? '#212121' : '#9E9E9E'}
          />
        </Svg>
        <TextRegular
          title="홈"
          style={
            screen === 'Home'
              ? 'text-Gray-10 text-Detail-1'
              : 'text-Gray-06 text-Detail-1'
          }
        />
      </Pressable>
      <Pressable
        className="flex flex-col items-center w-[72px]"
        onPress={() => navigation.navigate('StoreMainScreen')}>
        <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
          <Path
            d="M12 13.5C10.6739 13.5 9.40215 12.9732 8.46447 12.0355C7.52678 11.0979 7 9.82608 7 8.5H9C9 9.29565 9.31607 10.0587 9.87868 10.6213C10.4413 11.1839 11.2044 11.5 12 11.5C12.7956 11.5 13.5587 11.1839 14.1213 10.6213C14.6839 10.0587 15 9.29565 15 8.5H17C17 9.82608 16.4732 11.0979 15.5355 12.0355C14.5979 12.9732 13.3261 13.5 12 13.5ZM12 3.5C12.7956 3.5 13.5587 3.81607 14.1213 4.37868C14.6839 4.94129 15 5.70435 15 6.5H9C9 5.70435 9.31607 4.94129 9.87868 4.37868C10.4413 3.81607 11.2044 3.5 12 3.5ZM19 6.5H17C17 5.84339 16.8707 5.19321 16.6194 4.58658C16.3681 3.97995 15.9998 3.42876 15.5355 2.96447C15.0712 2.50017 14.52 2.13188 13.9134 1.8806C13.3068 1.62933 12.6566 1.5 12 1.5C10.6739 1.5 9.40215 2.02678 8.46447 2.96447C7.52678 3.90215 7 5.17392 7 6.5H5C3.89 6.5 3 7.39 3 8.5V20.5C3 21.0304 3.21071 21.5391 3.58579 21.9142C3.96086 22.2893 4.46957 22.5 5 22.5H19C19.5304 22.5 20.0391 22.2893 20.4142 21.9142C20.7893 21.5391 21 21.0304 21 20.5V8.5C21 7.96957 20.7893 7.46086 20.4142 7.08579C20.0391 6.71071 19.5304 6.5 19 6.5Z"
            fill={screen === 'Store' ? '#212121' : '#9E9E9E'}
          />
        </Svg>
        <TextRegular
          title="스토어"
          style={
            screen === 'Store'
              ? 'text-Gray-10 text-Detail-1'
              : 'text-Gray-06 text-Detail-1'
          }
        />
      </Pressable>
      <Pressable
        className="flex flex-col items-center w-[72px]"
        onPress={() => navigation.navigate('MyPageMainScreen')}>
        <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
          <Path
            d="M11.9996 2.8999C10.7266 2.8999 9.50567 3.40562 8.6055 4.30579C7.70532 5.20596 7.19961 6.42686 7.19961 7.6999C7.19961 8.97294 7.70532 10.1938 8.6055 11.094C9.50567 11.9942 10.7266 12.4999 11.9996 12.4999C13.2726 12.4999 14.4935 11.9942 15.3937 11.094C16.2939 10.1938 16.7996 8.97294 16.7996 7.6999C16.7996 6.42686 16.2939 5.20596 15.3937 4.30579C14.4935 3.40562 13.2726 2.8999 11.9996 2.8999ZM6.01041 13.6999C5.69437 13.6986 5.3812 13.7598 5.08884 13.8798C4.79648 13.9998 4.53069 14.1764 4.30672 14.3994C4.08275 14.6223 3.90499 14.8873 3.78365 15.1791C3.66231 15.471 3.59976 15.7839 3.59961 16.0999C3.59961 18.1291 4.59921 19.6591 6.16161 20.6563C7.70001 21.6367 9.77361 22.0999 11.9996 22.0999C14.2256 22.0999 16.2992 21.6367 17.8376 20.6563C19.4 19.6603 20.3996 18.1279 20.3996 16.0999C20.3996 15.4634 20.1468 14.8529 19.6967 14.4028C19.2466 13.9528 18.6361 13.6999 17.9996 13.6999H6.01041Z"
            fill={screen === 'MyPage' ? '#212121' : '#9E9E9E'}
          />
        </Svg>
        <TextRegular
          title="마이페이지"
          style={
            screen === 'MyPage'
              ? 'text-Gray-10 text-Detail-1'
              : 'text-Gray-06 text-Detail-1'
          }
        />
      </Pressable>
    </View>
  );
};

export default Footer;
