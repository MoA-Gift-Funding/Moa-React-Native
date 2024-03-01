import React, {useEffect, useState} from 'react';
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
import useProducts from '../../hooks/products/useProducts';
import {ProductDetail} from '../../types/Store';

const ItemDetail = ({route, navigation}) => {
  const {id, imageUrl, brand, productName, price, discountRate} = route.params;
  const [product, setProduct] = useState<ProductDetail | undefined>(undefined);
  const [productInfoSelected, setProductInfoSelected] = useState(true);
  const [caution, setCaution] = useState(true);

  const {handleSubmit} = useForm();

  const {productDetailQuery} = useProducts();
  useEffect(() => {
    async function getProduct() {
      const prod = await productDetailQuery(id);
      setProduct(prod);
    }
    getProduct();
  }, [productDetailQuery, id]);

  return (
    <>
      <ScrollView
        className="flex flex-col"
        showsVerticalScrollIndicator={false}>
        <View className="flex items-center">
          <Image
            className="w-full h-[360px]"
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <ItemDesc
          brand={brand}
          productName={productName}
          price={price}
          discountRate={discountRate}
        />
        <View className="mt-4 bg-white flex flex-col items-center">
          <View className="w-full flex flex-row justify-center border-b-[1px] border-b-Gray-03">
            <Pressable
              className={cls(
                'w-[156px] h-[48px] flex items-center justify-center',
                {'border-b-Main-01 border-b-2': productInfoSelected},
              )}
              onPress={() => setProductInfoSelected(true)}>
              <TextSemiBold title="상품 정보" style="text-Gray-10" />
            </Pressable>
            <Pressable
              className={cls(
                'w-[156px] h-[48px] flex items-center justify-center',
                {'border-b-Main-01 border-b-2': !productInfoSelected},
              )}
              onPress={() => setProductInfoSelected(false)}>
              <TextSemiBold title="이용 안내" style="text-Gray-10" />
            </Pressable>
          </View>
          <View className="w-[312px] min-h-[200px] py-6">
            {productInfoSelected && (
              <>
                <TextRegular
                  title={product?.description}
                  style="text-Gray-06 text-Body-2 leading-Body-2"
                />
              </>
            )}
            {!productInfoSelected &&
              product &&
              product.productExchangeRefundPolicy.policies.map(
                (policy, index) => {
                  if (index === 4) {
                    return;
                  }
                  return (
                    <View key={policy.title + index}>
                      <TextRegular
                        title={`▶ ${policy.title}`}
                        style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                      />
                      {policy.content.map(text => (
                        <TextRegular
                          title={`· ${text}`}
                          style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                        />
                      ))}
                    </View>
                  );
                },
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
                {product?.productExchangeRefundPolicy.policies.map(
                  (policy, index) => {
                    if (index !== 4) {
                      return;
                    }
                    return (
                      <View key={policy.title + index}>
                        <TextRegular
                          title={`▶ ${policy.title}`}
                          style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                        />
                        {policy.content.map(text => (
                          <TextRegular
                            title={`· ${text}`}
                            style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                          />
                        ))}
                      </View>
                    );
                  },
                )}
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
                id,
                price,
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
