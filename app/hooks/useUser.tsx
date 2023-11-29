import React from 'react';
import {UserFormData} from '../types/User';
import {useUserContext} from '../contexts/UserContext';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateUser} from '../apis/user/User';

export default function useUser() {
  const {
    userState: {
      user: {phoneNumber},
    },
  } = useUserContext();

  const queryClient = useQueryClient();
  const {mutate: updateUserQuery, data: updatedQueryUser} = useMutation({
    mutationFn: (formData: UserFormData) => updateUser(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: ['user', phoneNumber]}),
  });

  return {updateUserQuery, updatedQueryUser};
}
