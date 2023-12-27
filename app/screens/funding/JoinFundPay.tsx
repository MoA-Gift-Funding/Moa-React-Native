import React, {useState} from 'react';
import {Alert, Button, Pressable, ScrollView, View} from 'react-native';
import TextBold from '../../components/text/TextBold';
import {
  AgreementWidget,
  AgreementWidgetControl,
  PaymentMethodWidget,
  PaymentMethodWidgetControl,
  PaymentWidgetProvider,
  usePaymentWidget,
} from '@tosspayments/widget-sdk-react-native';
import NextButton from '../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {autoCurrency} from '../../utils/regex';

const JoinFundPay = ({navigation, route}) => {
  const {price} = route.params;
  return (
    <ScrollView
      className="px-6 bg-white h-full"
      showsVerticalScrollIndicator={false}>
      <View className="mt-8">
        <TextBold
          title="펀딩 결제 수단을"
          style="text-Heading-3 leading-Heading-3"
        />
        <TextBold
          title="선택해주세요."
          style="text-Heading-3 leading-Heading-3"
        />
      </View>
      <PaymentWidgetProvider
        clientKey={'test_gck_Z1aOwX7K8mydZ55A1deP8yQxzvNP'}
        customerKey={'test_gsk_LkKEypNArW26726WYYYQVlmeaxYG'}>
        <CheckoutPage price={price} />
      </PaymentWidgetProvider>
    </ScrollView>
  );
};
function CheckoutPage({price}: {price: string}) {
  const paymentWidgetControl = usePaymentWidget();
  const [paymentMethodWidgetControl, setPaymentMethodWidgetControl] =
    useState<PaymentMethodWidgetControl | null>(null);
  const [agreementWidgetControl, setAgreementWidgetControl] =
    useState<AgreementWidgetControl | null>(null);
  const {handleSubmit} = useForm();
  const navigation = useNavigation();
  return (
    <View className="flex flex-coljustify-end">
      <View>
        <PaymentMethodWidget
          selector="payment-methods"
          onLoadEnd={() => {
            paymentWidgetControl
              .renderPaymentMethods(
                'payment-methods',
                {value: Number(price)},
                {
                  variantKey: 'BRANDPAY',
                },
              )
              .then(control => {
                setPaymentMethodWidgetControl(control);
              });
          }}
        />
      </View>
      <View>
        <AgreementWidget
          selector="agreement"
          onLoadEnd={() => {
            paymentWidgetControl
              .renderAgreement('agreement', {
                variantKey: 'DEFAULT',
              })
              .then(control => {
                setAgreementWidgetControl(control);
              });
          }}
        />
      </View>
      <View className="flex justify-center items-center">
        <NextButton
          title={`${autoCurrency(price)}원 펀딩하기`}
          handleSubmit={handleSubmit}
          onSubmit={async () => {
            if (
              paymentWidgetControl == null ||
              agreementWidgetControl == null
            ) {
              Alert.alert('주문 정보가 초기화되지 않았습니다.');
              return;
            }

            const agreeement =
              await agreementWidgetControl.getAgreementStatus();
            if (agreeement.agreedRequiredTerms !== true) {
              Alert.alert('약관에 동의하지 않았습니다.');
              return;
            }

            paymentWidgetControl
              .requestPayment?.({
                orderId: 'yBVbkwLtWkAx_dzRGq8cc',
                orderName: '토스 티셔츠 외 2건',
              })
              .then(res => console.log(res))
              .then(() => navigation.navigate('JoinFundCompleted'))
              .catch(error => {
                console.log('실패!!!');
                console.log(error);
              });
          }}
        />
      </View>
    </View>
  );
}

export default JoinFundPay;
