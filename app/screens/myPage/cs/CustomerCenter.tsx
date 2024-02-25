import React, {useState} from 'react';
import {View} from 'react-native';
import SideToggle from '../../../components/button/SideToggle';
import MyInquiries from './MyInquiries';
import FAQ from './FAQ';

const CustomerCenter = () => {
  const [faqSelected, setFaqSelected] = useState(true);
  return (
    <View className="h-full bg-white border-t-2 border-Gray-02">
      <SideToggle
        state={faqSelected}
        onPress={() => setFaqSelected(!faqSelected)}
        leftTxt="자주 묻는 질문"
        rightTxt="1:1문의"
      />
      {faqSelected && <FAQ />}
      {!faqSelected && <MyInquiries />}
    </View>
  );
};

export default CustomerCenter;
