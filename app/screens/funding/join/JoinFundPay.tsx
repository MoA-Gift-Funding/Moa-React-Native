import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import TextBold from '../../../components/text/TextBold';
import {
  AgreementWidget,
  AgreementWidgetControl,
  PaymentMethodWidget,
  PaymentMethodWidgetControl,
  PaymentWidgetProvider,
  usePaymentWidget,
} from '@tosspayments/widget-sdk-react-native';
import NextButton from '../../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import {autoCurrency, createOrderId} from '../../../utils/regex';
import Toast from 'react-native-toast-message';
import usePayment from '../../../hooks/payments/usePayment';

const JoinFundPay = ({route}) => {
  const {price, id, title, nickName} = route.params;
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
        clientKey={'test_ck_6BYq7GWPVvgR5JAOJbPwrNE5vbo1'}
        customerKey={'test_gsk_LkKEypNArW26726WYYYQVlmeaxYG'}>
        <CheckoutPage price={price} orderName={title} nickName={nickName} />
      </PaymentWidgetProvider>
    </View>
  );
};
function CheckoutPage({
  price,
  orderName,
  nickName,
}: {
  price: string;
  orderName: string;
  nickName: string;
}) {
  const paymentWidgetControl = usePaymentWidget();
  const [paymentMethodWidgetControl, setPaymentMethodWidgetControl] =
    useState<PaymentMethodWidgetControl | null>(null);
  const [agreementWidgetControl, setAgreementWidgetControl] =
    useState<AgreementWidgetControl | null>(null);
  const {handleSubmit} = useForm();
  const orderId = createOrderId();

  const {prePayQuery, successPaymentQuery, failPaymentQuery} =
    usePayment(nickName);
  return (
    <View className="h-full flex flex-col justify-between">
      <ScrollView showsVerticalScrollIndicator={false}>
        <PaymentMethodWidget
          selector="payment-methods"
          onLoadEnd={() => {
            paymentWidgetControl
              .renderPaymentMethods('payment-methods', {value: Number(price)})
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

            await prePayQuery({orderId, amount: Number(price)});

            paymentWidgetControl
              .requestPayment?.({
                orderId,
                orderName,
              })
              .then(async result => {
                if (result?.success) {
                  const {orderId, amount, paymentKey} = result.success;
                  await successPaymentQuery({
                    orderId,
                    amount,
                    paymentKey,
                  });
                } else if (result?.fail) {
                  const {message, code} = result.fail;
                  await failPaymentQuery({message, code});
                }
              });
          }}
        />
      </View>
    </View>
  );
}

export default JoinFundPay;