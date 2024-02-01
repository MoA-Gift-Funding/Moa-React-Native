import React from 'react';
import {OauthProvider, User} from '../types/User';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Users} from '../apis/user/User';
import {UserHttpClient} from '../apis/user/UserHttpClient';
import {useUserContext} from '../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';

export default function useUser() {
  // const userClient = new UserHttpClient();
  // const user = new Users(userClient);
  const {userApi} = useUserContext();
  const queryClient = useQueryClient();

  const {mutateAsync: loginQuery, data: updatedUser} = useMutation({
    mutationFn: (platform: OauthProvider) => userApi.loginOAuth(platform),
    onSuccess: () => {
      queryClient.setQueryData(['user', updatedUser?.id], updatedUser);
    },
  });

  // const {data: queryUser} = useQuery({
  //   queryKey: ['user', userState?.user?.id || ''],
  //   queryFn: () => user.getUser(),
  // });

  const {mutate: updateUserQuery} = useMutation({
    mutationFn: data => {
      userApi.updateUser(data);
    },
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

  return {loginQuery, requestMobileQuery, verifyMobileQuery, signUpQuery};
}
