import React, {useState} from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
import LoadingBar from '../../components/bar/LoadingBar';
import ItemDesc from '../store/ItemDesc';
import cls from 'classnames';
import TextSemiBold from '../../components/text/TextSemiBold';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import TextRegular from '../../components/text/TextRegular';
import NextButton from '../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import FundDesc from './FundDesc';

const FundDetail = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(true);
  const [message, setMessage] = useState(false);
  const [caution, setCaution] = useState(true);
  const handleSelection = () => {
    setDescription(!description);
    setMessage(!message);
  };
  const {handleSubmit} = useForm();
  return (
    <ScrollView className="flex flex-col" showsVerticalScrollIndicator={false}>
      {loading && <LoadingBar />}
      <Image
        className="w-[360px] h-[360px]"
        source={{
          uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
        }}
      />
      <FundDesc />
    </ScrollView>
  );
};

export default FundDetail;
