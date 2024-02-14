import React from 'react';
import {View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import TextBold from '../../../components/text/TextBold';
import Countdown from 'react-countdown';
import {twoDP} from '../../../utils/regex';

const FundDesc = ({
  userName,
  title,
  endDate,
  fundingRate,
}: {
  userName: string;
  title: string;
  endDate: string;
  fundingRate: number;
}) => {
  return (
    <View className="flex items-center bg-white">
      <View className="w-[312px]">
        <View className="flex flex-col py-4 border-b-[1px] border-b-Gray-02 mt-2">
          <View>
            <TextRegular
              title={`${userName}님의 펀딩`}
              style="text-Gray-06 text-Body-2 leading-Body-2"
            />
            <TextBold
              numberOfLines={1}
              title={title}
              style="text-Gray-10 text-Heading-3 leading-Heading-3"
            />
          </View>
          <View className="mt-4">
            <TextRegular
              title="남은 시간"
              style="text-Gray-06 text-Body-2 leading-Body-2"
            />
            <Countdown
              date={new Date(endDate + ' 23:59:59')}
              renderer={({days, hours, minutes, seconds, completed}) => {
                if (completed) {
                  return (
                    <TextBold
                      title={'펀딩 종료'}
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
              title={`${fundingRate}%`}
              style="text-Gray-10 text-Heading-3 leading-Heading-3"
            />
            <View className="w-full bg-Sub-01 rounded-full h-3 mt-2">
              <View
                className={'bg-Main-01 h-3 rounded-full'}
                style={{width: `${fundingRate}%`}}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FundDesc;
