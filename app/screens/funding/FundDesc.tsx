import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import TextBold from '../../components/text/TextBold';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import ProgressBar from '../../components/bar/ProgressBar';
dayjs.extend(duration);

const FundDesc = () => {
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
      let timestamp = `${duration.days() && duration.days() + '일 '}${twoDP(
        duration.hours(),
      )}:${twoDP(duration.minutes())}:${twoDP(duration.seconds())}`;
      setTime(timestamp);
    }, interval);
  }, [endTime]);
  return (
    <View className="flex items-center bg-white">
      <View className="w-[312px]">
        <View className="flex flex-col py-4 border-b-[1px] border-b-Gray-02 mt-2">
          <View>
            <TextRegular
              title="그리니야님의 펀딩"
              style="text-Gray-06 text-Body-2 leading-Body-2"
            />
            <TextBold
              numberOfLines={1}
              title="경민이 집들이 선물 펀딩"
              style="text-Gray-10 text-Heading-3 leading-Heading-3"
            />
          </View>
          <View className="mt-4">
            <TextRegular
              title="남은 시간"
              style="text-Gray-06 text-Body-2 leading-Body-2"
            />
            <TextBold
              title={time}
              style="text-Gray-10 text-Heading-3 leading-Heading-3"
            />
          </View>
          <View className="mt-4">
            <TextRegular
              title="달성률"
              style="text-Gray-06 text-Body-2 leading-Body-2"
            />
            <TextBold
              title="80%"
              style="text-Gray-10 text-Heading-3 leading-Heading-3"
            />
            <ProgressBar progress={'w-4/5'} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FundDesc;
