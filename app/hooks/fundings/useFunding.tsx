import React from 'react';
import {useUserContext} from '../../contexts/UserContext';
import Funding from '../../apis/fund/Funding';
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  FundRequestStatus,
  NewFundItem,
  ReportItem,
  ShippingInfo,
} from '../../types/Funding';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const useFunding = (
  page?: number,
  size?: number,
  sort?: string,
  statuses?: FundRequestStatus,
) => {
  const {
    userState: {user},
    useApi: {client},
  } = useUserContext();
  const funding = new Funding(client);
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const {data: addrsQuery} = useQuery({
    queryKey: ['addresses', user?.id],
    queryFn: () => funding.getAddresses(),
  });

  const {mutateAsync: createAddrQuery} = useMutation({
    mutationFn: async (data: Omit<ShippingInfo, 'id'>) =>
      await funding.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['addresses', user?.id]});
      Toast.show({
        type: 'success',
        text1: '배송지가 추가되었어요🚚',
      });
    },
  });

  const {mutate: updateAddressQuery} = useMutation({
    mutationFn: ({data, id}: {data: Omit<ShippingInfo, 'id'>; id: number}) =>
      funding.updateAddress(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['addresses', user?.id]});
      Toast.show({
        type: 'success',
        text1: '배송지가 업데이트 되었어요🚚',
      });
    },
  });

  const {mutate: deleteAddressQuery} = useMutation({
    mutationFn: (id: number) => funding.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['addresses', user?.id]});
      Toast.show({
        type: 'success',
        text1: '배송지가 삭제되었어요🚚',
      });
    },
  });

  const {mutate: createFundingQuery} = useMutation({
    mutationFn: (data: NewFundItem) => funding.createFunding(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['myfunds', user?.id]});
      navigation.navigate('FundCompleted');
    },
  });

  const {data: myFundingsQuery, refetch: refetchMyFundingsQuery} = useQuery({
    queryKey: ['myfunds', user?.id],
    select: data => data.content,
    queryFn: () => funding.findMyFundings(page, size, sort),
  });

  const {
    data: myInfiteQuery,
    fetchNextPage: myInfiteFetchNextQuery,
    refetch: refetchMyInfiniteQuery,
  } = useInfiniteQuery({
    queryKey: ['myfundList', user?.id],
    queryFn: ({pageParam = 0}) =>
      funding.findMyFundings(pageParam, 10, 'createdDate,DESC'),
    getNextPageParam: lastPage => {
      if (lastPage.hasNext) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  const {data: friendFundingsQuery, refetch: refetchFriendFudingQuery} =
    useQuery({
      queryKey: ['friendsFunds', user?.id],
      select: data => data.content,
      queryFn: () => funding.findFriendFundings(statuses, page, size, sort),
    });

  const {
    data: friendFundingInfiteQuery,
    fetchNextPage: friendFundingInfiteFetchNextQuery,
    refetch: refetchFriendFundingInfiteQuery,
  } = useInfiniteQuery({
    queryKey: ['friendsFundList', user?.id],
    queryFn: ({pageParam = 0}) =>
      funding.findFriendFundings('PROCESSING, COMPLETED', pageParam, 10),
    getNextPageParam: lastPage => {
      if (lastPage.hasNext) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  const {mutateAsync: fundDetailQuery} = useMutation({
    mutationFn: (id: number) => funding.getFundDetail(id),
  });

  const {mutateAsync: joinFundQuery} = useMutation({
    mutationFn: (data: {
      orderId: number;
      paymentOrderId: string;
      message: string;
      visible: 'PUBLIC' | 'PRIVATE';
    }) => funding.joinFund(data),
    onSuccess: () => {
      navigation.navigate('JoinFundCompleted');
    },
  });

  const {mutateAsync: reportPostQuery} = useMutation({
    mutationFn: (item: ReportItem) => funding.reportPost(item),
    onSuccess: () => {
      Toast.show({type: 'success', text1: '신고가 처리 되었어요.'});
    },
  });

  return {
    addrsQuery,
    createAddrQuery,
    createFundingQuery,
    deleteAddressQuery,
    updateAddressQuery,
    myFundingsQuery,
    fundDetailQuery,
    friendFundingsQuery,
    refetchMyFundingsQuery,
    refetchFriendFudingQuery,
    myInfiteQuery,
    myInfiteFetchNextQuery,
    refetchMyInfiniteQuery,
    friendFundingInfiteQuery,
    friendFundingInfiteFetchNextQuery,
    refetchFriendFundingInfiteQuery,
    joinFundQuery,
    reportPostQuery,
  };
};

export default useFunding;
