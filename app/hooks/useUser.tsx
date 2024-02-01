import React from 'react';
import {OauthProvider, User} from '../types/User';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';

export default function useUser() {
  const {userApi} = useUserContext();
  const queryClient = useQueryClient();

  const {mutateAsync: loginQuery, data: updatedUser} = useMutation({
    mutationFn: (platform: OauthProvider) => userApi.loginOAuth(platform),
    onSuccess: () => {
      queryClient.setQueryData(['user', updatedUser?.id], updatedUser);
    },
  });

  const {mutate: updateUserQuery} = useMutation({
    mutationFn: (data: Partial<User>) => userApi.updateUser(data),
    onSuccess: () => navigation.navigate('Contact'),
  });

  const {mutate: requestMobileQuery} = useMutation({
    mutationFn: (phoneNumber: string) =>
      userApi.requestVerification(phoneNumber),
  });

  const {mutate: verifyMobileQuery} = useMutation({
    mutationFn: (verificationNumber: string) =>
      userApi.verifyPhoneNumber(verificationNumber),
  });

  const navigation = useNavigation();
  const {mutate: signUpQuery} = useMutation({
    mutationFn: (user: Partial<User>) => userApi.joinMoA(user),
    onSuccess: () => navigation.navigate('Profile'),
  });

  const {mutateAsync: updateProfileImageQuery} = useMutation({
    mutationFn: (data: {imageBody: any; name: string}) =>
      userApi.updateProfileImage(data),
  });

  return {
    loginQuery,
    requestMobileQuery,
    verifyMobileQuery,
    signUpQuery,
    updateUserQuery,
    updateProfileImageQuery,
  };
}
