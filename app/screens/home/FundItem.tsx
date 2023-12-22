import React, {useMemo, useState} from 'react';
import {Image, View} from 'react-native';
import {Circle, Path, Svg} from 'react-native-svg';
import TextRegular from '../../components/text/TextRegular';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const FundItem = () => {
  const [time, setTime] = useState<string>();
  const endTime = dayjs('2023-12-31T00:00:00');

  useMemo(() => {
    let currentTime = dayjs();
    let diffTime = endTime.unix() - currentTime.unix();

    let duration = dayjs.duration(diffTime * 1000, 'milliseconds');
    let interval = 1000;
    const twoDP = (n: number) => (n > 9 ? n : '0' + n);

    setInterval(function () {
      duration = dayjs.duration(
        duration.asMilliseconds() - interval,
        'milliseconds',
      );
      let timestamp = `${
        duration.days() && duration.days() + '일 '
      }${duration.hours()}:${twoDP(duration.minutes())}:${twoDP(
        duration.seconds(),
      )}`;
      setTime(timestamp);
    }, interval);
  }, [endTime]);
  return (
    <View className="flex flex-col">
      <View className="relative rounded-lg mr-2">
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
          }}
          className="w-[170px] h-[170px] rounded-lg"
        />
        <View className="bg-Gray-09/50 absolute bottom-0 rounded-b-lg h-[35px] w-full flex flex-row items-center justify-center">
          <View className="mr-1">
            <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <Circle cx="7.14185" cy="7.30469" r="6.5" stroke="white" />
              <Path
                d="M7.1106 3.84525V7.5685L9.76366 9.24389"
                stroke="white"
                stroke-linecap="round"
              />
            </Svg>
          </View>
          <TextRegular
            title="마감 시간"
            style="text-white mr-1 text-Detail-1"
          />
          <TextRegular title={time} style="text-white mr-1 text-Detail-1" />
        </View>
      </View>
      <View className="w-[170px]">
        <View className="flex flex-row items-center mt-3">
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-suzy_ukhrxz.png',
            }}
            className="w-[25px] h-[25px] rounded-full"
          />
          <TextRegular title="배수지" style="text-Body-1 ml-2" />
        </View>
        <TextRegular
          title="내 30번째 생일 선물은 안녕핫메요이ㅓ댜ㅐㅓ"
          numberOfLines={1}
          style="text-Body-2 mt-1 text-ellipsis "
        />
      </View>
    </View>
  );
};

export default FundItem;
