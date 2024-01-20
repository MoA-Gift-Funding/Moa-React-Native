import {Contact} from '../../types/User';
import {Axios} from '../axios.config';

export const requestVerifyMSG = async (phoneNumber: string) => {
  let sent = false;
  try {
    await Axios.post('/members/verification/phone/send-number', {
      phoneNumber,
    }).then(res => {
      console.log(res.status);
      sent = true;
    });
    return sent;
  } catch (error: any) {
    console.log(error);
    console.log(error.status);

    console.error(error.response.data);
    return sent;
  }
};

export const verifyPhoneNumber = async ({
  verificationNumber,
}: {
  verificationNumber: string;
}) => {
  const verified = {isVerified: false, message: ''};
  try {
    await Axios.post('/members/verification/phone/verify', {
      verificationNumber,
    }).then(res => {
      console.log(res.data);

      verified.isVerified = true;
      // if (res.data.message === 'Verified VerificationNumber') {
      // }
    });
    return verified;
  } catch (error: any) {
    const {
      response: {
        data: {message},
      },
    } = error;
    switch (message) {
      case 'Incorrect certification code':
        verified.message = '잘못된 인증번호입니다.';
        break;
      default:
        verified.message = '시간이 초과되었습니다. 다시 시도해주세요.';
    }
    return verified;
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
