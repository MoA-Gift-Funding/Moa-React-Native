import React from 'react';
import {OauthProvider, User} from '../../types/User';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';
import {Users} from '../../apis/user/User';

export default function useUser() {
  const {client} = useUserContext();
  const user = new Users(client);
  const queryClient = useQueryClient();

  const {mutateAsync: getUserQuery} = useMutation({
    mutationFn: () => user.getUser(),
    onSuccess: data => console.log(data),
  });

  const {mutateAsync: loginQuery, data: updatedUser} = useMutation({
    mutationFn: (platform: OauthProvider) => user.loginOAuth(platform),
    onSuccess: () => {
      queryClient.setQueryData(['user', updatedUser?.id], updatedUser);
    },
  });

  const {mutate: updateUserQuery} = useMutation({
    mutationFn: (data: Partial<User>) => user.updateUser(data),
    onSuccess: data => console.log(data),
  });

  const {mutate: requestMobileQuery} = useMutation({
    mutationFn: (phoneNumber: string) => user.requestVerification(phoneNumber),
  });

  const {mutate: verifyMobileQuery} = useMutation({
    mutationFn: (verificationNumber: string) =>
      user.verifyPhoneNumber(verificationNumber),
  });

  const navigation = useNavigation();
  const {mutate: signUpQuery} = useMutation({
    mutationFn: (users: Partial<User>) => user.joinMoA(users),
    onSuccess: () => navigation.navigate('Profile'),
  });

  const {mutateAsync: updateProfileImageQuery} = useMutation({
    mutationFn: (data: {imageBody: any; name: string}) =>
      user.updateProfileImage(data),
  });

  return {
    loginQuery,
    requestMobileQuery,
    verifyMobileQuery,
    signUpQuery,
    updateUserQuery,
    updateProfileImageQuery,
    getUserQuery,
  };
}
