import React from 'react';
import {useUserContext} from '../../contexts/UserContext';
import CustomerService from '../../apis/cs/CustomerService';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CSCategories} from '../../types/CS';

const useCS = () => {
  const {
    useApi: {client},
    userState: {user},
  } = useUserContext();
  const csCenter = new CustomerService(client);
  const queryClient = useQueryClient();

  const {data: faqsQuery, refetch: refetchFaqQuery} = useQuery({
    queryKey: ['faqs'],
    queryFn: () => csCenter.getFaqs(),
  });

  const {data: personalInquiresQuery, refetch: refetchPersonalInquiresQuery} =
    useQuery({
      queryKey: ['inquiries', user?.id],
      queryFn: () => csCenter.getPersonalInquiries(),
    });

  const {mutateAsync: updatePersonalInquiryquery} = useMutation({
    mutationFn: (data: {category: CSCategories; content: string}) =>
      csCenter.postPersonalInquiry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['inquires', user?.id]});
    },
  });

  return {
    faqsQuery,
    refetchFaqQuery,
    personalInquiresQuery,
    refetchPersonalInquiresQuery,
    updatePersonalInquiryquery,
  };
};

export default useCS;
