import React from 'react';
import {FriendsHttpClient} from '../apis/friends/FriendsHttpClients';
import {Friends} from '../apis/friends/Friends';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useUserContext} from '../contexts/UserContext';

export default function useFriends() {
  const client = new FriendsHttpClient();
  const friends = new Friends(client);

  const {
    userState: {user},
  } = useUserContext();

  const queryClient = useQueryClient();

  const {data: friendsQuery} = useQuery({
    queryKey: ['friends', user?.id],
    queryFn: () => friends.getList(),
  });

  const {mutate: blockQuery} = useMutation({
    mutationFn: (friendId: number) => friends.block(friendId),
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: ['friends', user?.id]}),
  });

  const {mutate: unblockQuery} = useMutation({
    mutationFn: (friendId: number) => friends.unblock(friendId),
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: ['friends', user?.id]}),
  });

  return {friendsQuery, blockQuery, unblockQuery};
}
