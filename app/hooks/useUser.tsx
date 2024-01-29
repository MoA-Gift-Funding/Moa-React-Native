import React from 'react';
import {OauthProvider} from '../types/User';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Users} from '../apis/user/User';
import {UserHttpClient} from '../apis/user/UserHttpClient';

export default function useUser() {
  const userClient = new UserHttpClient();
  const user = new Users(userClient);
  const queryClient = useQueryClient();
  const {mutateAsync: loginQuery, data: updatedUser} = useMutation({
    mutationFn: (platform: OauthProvider) => user.loginOAuth(platform),
    onSuccess: () => {
      queryClient.setQueryData([updatedUser?.id], updatedUser);
    },
  });

  return {loginQuery};
}
