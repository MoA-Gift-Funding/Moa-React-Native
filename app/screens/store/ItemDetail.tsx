import React, {useState} from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
import ItemDesc from './ItemDesc';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import cls from 'classnames';
import NextButton from '../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import Footer from '../../components/footer/Footer';

const ItemDetail = ({route, navigation}) => {
  const {brand, uri, productName, sale, price} = route.params;
  const [productInfo, setProductInfo] = useState(true);
  const [instruction, setInstruction] = useState(false);
  const [caution, setCaution] = useState(true);
  const [imgHeight, setImgHeight] = useState(0);
  const size = Image.getSize(
    'https://img.29cm.co.kr/next_product/2022/08/18/19d97ec4-a1b9-484f-9180-26eb32abf8a7_20220818122618.jpg?width=312',
    (width, height) => {
      setImgHeight(height);
    },
  );

  const handleSelection = () => {
    setProductInfo(!productInfo);
    setInstruction(!instruction);
  };
  const {handleSubmit} = useForm();
  return (
    <>
      <ScrollView
        className="flex flex-col"
        showsVerticalScrollIndicator={false}>
        <Image
          className="w-[360px] h-[360px]"
          source={{
            uri,
          }}
        />
        <ItemDesc
          brand={brand}
          productName={productName}
          price={price}
          sale={sale}
        />
        <View className="mt-4 bg-white flex flex-col items-center">
          <View className="w-full flex flex-row justify-center border-b-[1px] border-b-Gray-03">
            <Pressable
              className={cls(
                'w-[156px] h-[48px] flex items-center justify-center',
                {'border-b-Main-01 border-b-2': productInfo},
              )}
              onPress={handleSelection}>
              <TextSemiBold title="상품 정보" style="text-Gray-10" />
            </Pressable>
            <Pressable
              className={cls(
                'w-[156px] h-[48px] flex items-center justify-center',
                {'border-b-Main-01 border-b-2': instruction},
              )}
              onPress={handleSelection}>
              <TextSemiBold title="이용 안내" style="text-Gray-10" />
            </Pressable>
          </View>
          <View className="w-[312px] py-6">
            {productInfo && (
              <>
                <TextRegular
                  title={
                    "UGG는 'Feels Like Nothing Else'라는 슬로건을 통해, 소비자들에게 최상의 착화감을 제공하기 위해 노력합니다. 'UGG = 양털부츠'라는 기존의 공식을 넘어, 엄격한 원칙과 기준을 준수하여 혁신적인 스타일을 추구하는 글로벌 라이프 스타일 브랜드입니다. 어쩌구 저쩌구 상품 정보 내용"
                  }
                  style="text-Gray-06 text-Body-2 leading-Body-2"
                />
                <Image
                  source={{
                    uri: 'https://img.29cm.co.kr/next_product/2022/08/18/19d97ec4-a1b9-484f-9180-26eb32abf8a7_20220818122618.jpg?width=1000',
                  }}
                  className={'w-[312px] h-[2000px]'}
                  resizeMode="cover"
                />
              </>
            )}
            {instruction && (
              <TextRegular
                title="1. 선물상품 선택
2. 선물상품 구매
3. 기프티쇼 수신
4. 교환처에서 실물교환"
                style="text-Gray-06 text-Body-2 leading-Body-2"
              />
            )}
          </View>
          <Pressable
            className="w-full border-y-[1px] border-Gray-02 flex items-center"
            onPress={() => setCaution(!caution)}>
            <View className="w-[312px] h-[60px] flex flex-row justify-between items-center">
              <TextSemiBold
                title="주의 사항"
                style="text-Body-2 text-Gray-10"
              />
              <FontAwesomeIcon icon={caution ? faChevronDown : faChevronUp} />
            </View>
            {caution && (
              <View className="w-full bg-Gray-02 flex items-center py-4">
                <TextRegular
                  title="[구매취소]
구매일로부터 7일 이내에는 구매취소가 가능하며, 주문취소를 신청할 경우 결제 승인을 취소합니다.
단, 결제수단 및 취소 시점에 따라 승인 취소가 불가능할 수 있으며, 이 경우 금액의 포인트 적립 또는 인증된 계좌로 현금 환급을 신청하실 수 있습니다.
특정 이벤트를 통한 구매 상품의 경우 구매 취소가 불가합니다."
                  style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                />
              </View>
            )}
          </Pressable>
        </View>
        <View className="bg-white flex items-center py-6">
          <NextButton
            title="펀딩 개설하기"
            handleSubmit={handleSubmit}
            onSubmit={() =>
              navigation.navigate('NewFund', {
                headerTitle: '펀딩개설하기',
                search: false,
              })
            }
          />
        </View>
      </ScrollView>
      <Footer screen="Store" />
    </>
  );
};

export default ItemDetail;
