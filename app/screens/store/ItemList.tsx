import React from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import Item from './Item';
import Footer from '../../components/footer/Footer';
const ItemList = () => {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
        <View className="flex flex-row justify-center mt-6">
          <View className="flex flex-row justify-between w-[312px]">
            <TextRegular
              title={'상품 1,234개'}
              style="text-Gray-08 text-Detail-1"
            />
            <Pressable className="flex flex-row items-center">
              {/* <TextRegular
              title={filter}
              style="text-Gray-08 text-Detail-1 mr-1"
            />
            <FontAwesomeIcon
              icon={faArrowUpShortWide}
              color="#616161"
              size={12}
            /> */}
            </Pressable>
          </View>
        </View>
        <View className="flex items-center mt-3">
          <View className="w-[320px] flex flex-row flex-wrap gap-2">
            <View>
              <Item
                brand="Apple"
                productName="에어팟 맥스 실버"
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
                sale="5"
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
                sale="10"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer screen="Store" />
    </>
  );
};

export default ItemList;
