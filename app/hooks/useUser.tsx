import React from 'react';
import {OauthProvider} from '../types/User';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Users} from '../apis/user/User';
import {UserHttpClient} from '../apis/user/UserHttpClient';
import {useUserContext} from '../contexts/UserContext';

export default function useUser() {
  const userClient = new UserHttpClient();
  const user = new Users(userClient);
  const {userState} = useUserContext();
  const queryClient = useQueryClient();

  const {mutateAsync: loginQuery, data: updatedUser} = useMutation({
    mutationFn: (platform: OauthProvider) => user.loginOAuth(platform),
    onSuccess: () => {
      queryClient.setQueryData(['user', updatedUser?.id], updatedUser);
    },
  });

  const {data: queryUser} = useQuery({
    queryKey: ['user', userState?.user?.id],
    queryFn: () => user.getUser(),
  });

  return {loginQuery, queryUser};
}
