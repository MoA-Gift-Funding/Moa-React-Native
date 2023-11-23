import React from 'react';
import {UserFormData} from '../types/User';
import {useUserContext} from '../contexts/UserContext';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateUser} from '../apis/user/User';

export default function useUser() {
  const {
    userState: {
      user: {email},
    },
  } = useUserContext();
  const queryClient = useQueryClient();
  const updateUserQuery = useMutation({
    mutationFn: (formData: UserFormData) => updateUser(formData),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['user', email]}),
  });

  return {updateUserQuery};
}
