import React from 'react';
import {View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import TextBold from '../../components/text/TextBold';
import ProgressBar from '../../components/bar/ProgressBar';
import Countdown from 'react-countdown';
import {twoDP} from '../../utils/regex';

const FundDesc = () => {
  const endTime = '2023-12-31T00:00:00';
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
            <Countdown
              date={endTime}
              renderer={({days, hours, minutes, seconds, completed}) => {
                if (completed) {
                  return (
                    <TextBold
                      title={'00:00:00'}
                      style="text-Gray-10 text-Heading-3 leading-Heading-3"
                    />
                  );
                } else {
                  return (
                    <TextBold
                      title={`${days}일 ${twoDP(hours)}:${twoDP(
                        minutes,
                      )}:${twoDP(seconds)}`}
                      style="text-Gray-10 text-Heading-3 leading-Heading-3"
                    />
                  );
                }
              }}
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
