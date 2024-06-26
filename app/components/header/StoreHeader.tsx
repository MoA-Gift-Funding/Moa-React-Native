import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, SafeAreaView, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {throttle} from '../../utils/device';

const StoreHeader = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="flex flex-row justify-between h-14 items-center bg-white px-1">
        <Pressable
          className="ml-6"
          onPress={() => navigation.navigate('HomeScreen')}>
          <Svg width={35} height={35} viewBox="0 0 35 35" fill={'none'}>
            <Path
              d="M14.3375 34.6035H1.81092C1.18459 34.6035 0.714844 34.0933 0.714844 33.5045V27.2246C0.714844 23.1426 4.00307 19.8456 8.0742 19.8456C12.1453 19.8456 15.4336 23.1426 15.4336 27.2246V33.5045C15.4336 34.0933 14.9638 34.6035 14.3375 34.6035Z"
              fill="#FF6914"
            />
            <Path
              d="M26.7466 15.5282C22.6755 15.5282 19.3873 12.2312 19.3873 8.14923C19.3873 4.06725 22.6755 0.770264 26.7466 0.770264C30.8178 0.770264 34.106 4.06725 34.106 8.14923C34.1451 12.2312 30.8178 15.5282 26.7466 15.5282Z"
              fill="#FF6914"
            />
            <Path
              d="M13.0456 1.59457L8.34812 6.30455L3.65066 1.59457C3.45493 1.39832 3.14177 1.28058 2.86775 1.28058H2.08484C1.45851 1.28058 0.988765 1.79082 0.988765 2.37957V14.9395C0.988765 15.5675 1.49766 16.0385 2.08484 16.0385H14.6114C15.2377 16.0385 15.7075 15.5283 15.7075 14.9395V2.37957C15.7075 1.75157 15.1986 1.28058 14.6114 1.28058H13.8285C13.5545 1.28058 13.2413 1.39832 13.0456 1.59457Z"
              fill="#FF6914"
            />
            <Path
              d="M30.5436 20.709C28.1166 20.5913 26.7856 22.7108 26.7856 22.7108C26.7856 22.7108 25.4547 20.6305 23.0277 20.709C19.348 20.866 17.469 25.733 19.9743 28.5982C20.0918 28.716 20.2092 28.8337 20.3266 28.9907C22.4796 31.1102 24.7892 33.3475 26.0027 34.4465C26.4333 34.8782 27.1379 34.8782 27.5685 34.4465C28.7429 33.3475 31.0916 31.1102 33.2446 28.9907C33.3621 28.873 33.4795 28.7552 33.597 28.5982C36.0631 25.6937 34.1841 20.866 30.5436 20.709Z"
              fill="#FF6914"
            />
          </Svg>
        </Pressable>
        <View className="flex flex-row mr-6 items-center justify-center gap-4">
          {/* <Pressable onPress={() => {}}>
            <Image
              className="w-[24px] h-[24px]"
              source={{
                uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701328794/moa-search_cerljn.png',
              }}
            />
          </Pressable> */}
          {/* <Pressable onPress={() => navigation.navigate('MyPage')}>
            <Image
              className="w-[17px] h-[17px]"
              source={{
                uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701328794/moa-menu_iucqpk.png',
              }}
            />
          </Pressable> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StoreHeader;
