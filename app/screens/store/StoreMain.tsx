import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import Categories from './Categories';
import TextBold from '../../components/text/TextBold';
import Item from './Item';

const StoreMain = () => {
  return (
    <ScrollView
      className="h-full bg-white"
      showsVerticalScrollIndicator={false}>
      <View className="flex items-center mt-3">
        <Image
          className="w-[312px] h-[312px]"
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321006/moa-banner_pic5bu.png',
          }}
        />
      </View>
      <View className="flex flex-col mt-6">
        <Categories />
      </View>
      <View className="flex my-8">
        <TextBold title="오늘의 인기 선물" style="text-Heading-4 ml-7" />
        <View className="flex items-center justify-center">
          <View className="w-[320px] flex flex-row flex-wrap gap-2 mt-4">
            <View>
              <Item
                brand="Apple"
                productName="에아팟 맥스 실버"
                price="769,000"
                uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701324743/moa-airpodmax_atdbl3.png"
              />
            </View>
            <View>
              <Item
                brand="UGG"
                productName="어그 디스케트 슬리퍼 체스트넛"
                price="121,000"
                uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701324751/moa-ugg_iwe8n0.png"
                sale="10"
              />
            </View>
            <View>
              <Item
                brand="Apple"
                productName="애플 아이폰 15 프로 256기가 내츄럴 티타늄"
                price="1,615,000"
                uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701328200/moa-iphone15_tkoejy.png"
              />
            </View>
            <View>
              <Item
                brand="제주항공"
                productName="기프티켓 국내 항공권 편도(주말)"
                price="99,000"
                uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701324744/moa-flight_bdkvpi.png"
              />
            </View>
            <View>
              <Item
                brand="Diptyque"
                productName="딥티크 플레르 드 뽀 오드 퍼퓸 75ml"
                price="135,300"
                uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701324744/moa-diptyque_zhucyv.png"
              />
            </View>
            <View>
              <Item
                brand="The North Face"
                productName="노스페이스 1996 에코 눕시 자켓 블랙"
                price="339,000"
                uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701324748/moa-northface_naukkm.png"
              />
            </View>
            <View>
              <Item
                brand="The North Face"
                productName="노스페이스 1996 에코 눕시 자켓 블랙"
                price="339,000"
                uri="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701324748/moa-northface_naukkm.png"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StoreMain;
