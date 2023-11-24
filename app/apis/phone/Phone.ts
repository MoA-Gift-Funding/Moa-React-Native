import {Axios} from '../axios.config';

export const requestVerifyMSG = async (recipientNo: string) => {
  try {
    await Axios.post('/users/send-verification-number', {recipientNo}).then(
      res => console.log(res.data),
    );
  } catch (error) {
    console.error(error);
  }
};

export const verifyPhoneNumber = async ({
  recipientNo,
  verificationNumber,
}: {
  recipientNo: string;
  verificationNumber: string;
}) => {
  try {
    let verified = false;
    await Axios.post('/users/verify-verification-number', {
      recipientNo,
      verificationNumber,
    }).then(res => {
      if (res.data.message === 'Verified VerificationNumber') {
        verified = true;
      }
    });
    return verified;
  } catch (error) {
    console.error(error);
    throw new Error('[ERROR] Unknown Error');
  }
};
