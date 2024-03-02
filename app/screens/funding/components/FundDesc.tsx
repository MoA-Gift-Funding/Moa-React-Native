import React from 'react';
import {View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import TextBold from '../../../components/text/TextBold';
import Countdown from 'react-countdown';
import {twoDP} from '../../../utils/regex';
import ReportAndEditButton from '../../../components/button/ReportAndEditButton';
import {FundStatus} from '../../../types/Funding';

const FundDesc = ({
  id,
  userName,
  title,
  endDate,
  fundingRate,
  status,
}: {
  id: number;
  userName: string;
  title: string;
  endDate: string;
  fundingRate: number;
  status: FundStatus;
}) => {
  return (
    <View className="flex items-center bg-white">
      <View className="w-[312px]">
        <View className="flex flex-col py-4 border-b-[1px] border-b-Gray-02 mt-2">
          <View className="flex flex-row justify-between items-center">
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
            <ReportAndEditButton domainId={id} domainType="FUNDING" />
          </View>
          <View className="mt-4">
            <TextRegular
              title="남은 시간"
              style="text-Gray-06 text-Body-2 leading-Body-2"
            />
            {status === 'PROCESSING' ? (
              <Countdown
                date={endDate + ' 23:59:59'}
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
            ) : (
              <TextBold
                title={'펀딩 종료'}
                style="text-Gray-10 text-Heading-3 leading-Heading-3"
              />
            )}
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
