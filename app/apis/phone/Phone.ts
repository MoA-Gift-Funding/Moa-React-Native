import AsyncStorage from '@react-native-async-storage/async-storage';
import {Contact} from '../../types/User';
import {Axios} from '../axios.config';

export const requestVerifyMSG = async (phoneNumber: string) => {
  let sent = false;
  try {
    await Axios.post('/members/verification/phone/send-number', {
      phoneNumber,
    }).then(() => {
      sent = true;
    });
    return sent;
  } catch (error: any) {
    console.log(error.response);
    switch (error.response.status) {
      case 401:
        await AsyncStorage.clear();
        throw new Error('세션이 만료되었습니다. 재로그인이 필요합니다.');
      case 403:
        throw new Error('인증번호가 일치하지 않습니다. 다시 시도해주세요.');
      case 404:
        await AsyncStorage.clear();
        throw new Error('재로그인이 필요합니다.');
      case 409:
        throw new Error('이미 사용중인 번호입니다. 고객센터로 문의바랍니다.');
      default:
        throw new Error('네트워크 에러가 발생했습니다. 다시 시도해주세요.');
    }
  }
};

export const verifyPhoneNumber = async (verificationNumber: string) => {
  let verified = false;
  try {
    await Axios.post('/members/verification/phone/verify', {
      verificationNumber,
    }).then(() => {
      verified = true;
    });
    return verified;
  } catch (error: any) {
    console.log(error.response);
    console.log('실패!');

    switch (error.response.status) {
      case 401:
        await AsyncStorage.clear();
        throw new Error('세션이 만료되었습니다. 재로그인이 필요합니다.');
      case 403:
        throw new Error('인증번호가 일치하지 않습니다. 다시 시도해주세요.');
      case 404:
        await AsyncStorage.clear();
        throw new Error('재로그인이 필요합니다.');
      case 409:
        throw new Error('이미 사용중인 번호입니다. 고객센터로 문의바랍니다.');
      default:
        throw new Error('네트워크 에러가 발생했습니다. 다시 시도해주세요.');
    }
  }
};

export const connectContacts = async ({
  contactList,
}: {
  contactList: Contact[];
}) => {
  try {
    const res = await Axios.post('/friends/sync-contact', {contactList});
    console.log(res);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    console.log(error.request);
    console.log(error.response);
  }
};
