import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
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
import {autoCurrency, createOrderId} from '../../utils/regex';
import Toast from 'react-native-toast-message';

const JoinFundPay = ({navigation, route}) => {
  const {price, id, title} = route.params;
  return (
    <View className="px-6 bg-white h-full">
      <View className="mt-4">
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
        <CheckoutPage price={price} orderName={title} />
      </PaymentWidgetProvider>
    </View>
  );
};
function CheckoutPage({price, orderName}: {price: string; orderName: string}) {
  const paymentWidgetControl = usePaymentWidget();
  const [paymentMethodWidgetControl, setPaymentMethodWidgetControl] =
    useState<PaymentMethodWidgetControl | null>(null);
  const [agreementWidgetControl, setAgreementWidgetControl] =
    useState<AgreementWidgetControl | null>(null);
  const {handleSubmit} = useForm();
  const navigation = useNavigation();
  const orderId = createOrderId();
  return (
    <View className="h-full flex flex-col justify-between">
      <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView>
      <View className="flex justify-center items-center mb-28">
        <NextButton
          title={`${autoCurrency(price)}원 펀딩하기`}
          handleSubmit={handleSubmit}
          onSubmit={async () => {
            if (
              paymentWidgetControl == null ||
              agreementWidgetControl == null
            ) {
              Toast.show({
                type: 'error',
                text1: '주문 정보가 초기화되지 않았어요. 다시 시도해주세요.',
              });
              return;
            }

            const agreeement =
              await agreementWidgetControl.getAgreementStatus();
            if (agreeement.agreedRequiredTerms !== true) {
              Toast.show({
                type: 'error',
                text1: '약관에 동의해주세요.',
              });
              return;
            }

            paymentWidgetControl
              .requestPayment?.({
                orderId,
                orderName,
              })
              .then(result => {
                if (result?.success) {
                  // 결제 성공 비즈니스 로직을 구현하세요.
                  // result.success에 있는 값을 서버로 전달해서 결제 승인을 호출하세요.
                } else if (result?.fail) {
                  // 결제 실패 비즈니스 로직을 구현하세요.
                }
              });
          }}
        />
      </View>
    </View>
  );
}

export default JoinFundPay;
