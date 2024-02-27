import React from 'react';
import {View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import TextDeepLink from '../../../components/text/TextDeepLink';

const MoA = () => {
  return (
    <View className="h-full">
      <View className="border-Gray-02 border-t-2 bg-white">
        <View className="h-[62px] px-6 flex justify-center border-b-2 border-Gray-02">
          <TextRegular title="약관 및 정책" style="text-Gray-06" />
        </View>
        <View className="h-[62px] flex justify-center items-center border-Gray-01 border-b-2">
          <View className="w-[312px] flex flex-row items-center">
            <TextDeepLink
              text="이용약관"
              style="text-Body-2 text-Gray-08"
              url="https://scalloped-oriole-e20.notion.site/9a69de5e6cf642b5aa91547369ff8ae2"
            />
          </View>
        </View>
        <View className="h-[62px] flex justify-center items-center border-Gray-01 border-b-2">
          <View className="w-[312px] flex flex-row items-center">
            <TextDeepLink
              text="개인정보 처리방침"
              style="text-Body-2 text-Gray-08"
              url="https://scalloped-oriole-e20.notion.site/2000535c63d542468afbb0722ff96f08"
            />
          </View>
        </View>
      </View>
      <View className="mt-4 bg-white">
        <View className="h-[62px] px-6 flex justify-center border-b-2 border-Gray-02">
          <TextRegular title="회사 소개" style="text-Gray-06" />
        </View>
        <View className="flex px-6 justify-center border-b-2 border-Gray-02 py-4">
          <View className="flex flex-row mt-1">
            <TextRegular
              title="상호"
              style="text-Gray-10 text-Detail-1 w-[80px]"
            />
            <TextRegular title="모아" style="text-Gray-10 text-Detail-1 ml-4" />
          </View>
          <View className="flex flex-row mt-1">
            <TextRegular
              title="대표자"
              style="text-Gray-08 text-Detail-1 w-[80px]"
            />
            <TextRegular
              title="이수진"
              style="text-Gray-08 text-Detail-1 ml-4"
            />
          </View>
          <View className="flex flex-row mt-1">
            <TextRegular
              title="주소"
              style="text-Gray-08 text-Detail-1 w-[80px]"
            />
            <TextRegular
              title="서울특별시 영등포구 버드나루로 12길 8, 1082"
              style="text-Gray-08 text-Detail-1 ml-4"
            />
          </View>
          <View className="flex flex-row mt-1">
            <TextRegular
              title="사업자등록번호"
              style="text-Gray-08 text-Detail-1 w-[80px]"
            />
            <TextRegular
              title="508-20-28553"
              style="text-Gray-08 text-Detail-1 ml-4"
            />
          </View>
          <View className="flex flex-row mt-1">
            <TextRegular
              title="통신판매번호"
              style="text-Gray-08 text-Detail-1 w-[80px]"
            />
            <TextRegular
              title="508-20-28553"
              style="text-Gray-08 text-Detail-1 ml-4"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MoA;
