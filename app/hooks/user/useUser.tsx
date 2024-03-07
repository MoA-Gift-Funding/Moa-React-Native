import React from 'react';
import {OauthProvider, User} from '../../types/User';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function useUser() {
  const {
    userState: {user},
    dispatch,
    useApi: {useUserApi},
  } = useUserContext();
  const queryClient = useQueryClient();

  const {mutateAsync: getUserQuery} = useMutation({
    mutationFn: () => useUserApi.getUser(),
  });

  const {mutateAsync: loginQuery, data: updatedUser} = useMutation({
    mutationFn: (platform: OauthProvider) => useUserApi.loginOAuth(platform),
    onSuccess: () => {
      queryClient.setQueryData(['user', updatedUser?.id], updatedUser);
    },
  });

  const {mutate: updateUserQuery} = useMutation({
    mutationFn: (data: Partial<User>) => useUserApi.updateUser(data),
  });

  const {mutate: requestMobileQuery} = useMutation({
    mutationFn: (phoneNumber: string) =>
      useUserApi.requestVerification(phoneNumber),
    onError: err => {
      if (err.message === 'Request failed with status code 409') {
        navigation.navigate('LoginScreen');
        Toast.show({
          type: 'error',
          text1: '이미 가입된 번호예요. 가입하신 플랫폼으로 로그인해주세요🙏🏻',
          visibilityTime: 5000,
        });
      }
      throw err;
    },
  });

  const {mutate: verifyMobileQuery} = useMutation({
    mutationFn: (verificationNumber: string) =>
      useUserApi.verifyPhoneNumber(verificationNumber),
    onSuccess: () => signUpQuery(user!),
  });

  const navigation = useNavigation();
  const {mutate: signUpQuery} = useMutation({
    mutationFn: (data: Partial<User>) => useUserApi.joinMoA(data),
    onSuccess: () => navigation.navigate('ProfilePhotoScreen'),
  });

  const {mutateAsync: updateProfileImageQuery} = useMutation({
    mutationFn: (data: {imageBody: any; name: string}) =>
      useUserApi.updateProfileImage(data),
  });

  const {mutateAsync: deactivateUserQuery} = useMutation({
    mutationFn: () => useUserApi.deactivateUser(user?.oauthProvider!),
    onSuccess: async () => {
      Toast.show({
        type: 'success',
        text1: '탈퇴가 완료되었습니다. 다음에 또 만나요🥹',
      });
      await dispatch({type: 'LOGOUT'});
    },
  });

  return {
    loginQuery,
    requestMobileQuery,
    verifyMobileQuery,
    signUpQuery,
    updateUserQuery,
    updateProfileImageQuery,
    getUserQuery,
    deactivateUserQuery,
  };
}
