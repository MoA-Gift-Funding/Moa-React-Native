import {getProfile, login} from '@react-native-seoul/kakao-login';

export const loginKakao = () => {
  login()
    .then(res => {
      console.log(res);
      const profile = getProfile();
      console.log(profile);
    })
    .catch(console.error);
};
