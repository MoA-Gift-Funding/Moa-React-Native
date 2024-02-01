import React from 'react';
import {FriendsHttpClient} from '../apis/friends/FriendsHttpClients';
import {Friends} from '../apis/friends/Friends';
import {useQuery} from '@tanstack/react-query';
import {useUserContext} from '../contexts/UserContext';

export default function useFriends() {
  const client = new FriendsHttpClient();
  const friends = new Friends(client);

  const {
    userState: {user},
  } = useUserContext();

  const {data: friendsQuery} = useQuery({
    queryKey: ['friends', user?.id],
    queryFn: async () => await friends.getList(),
  });

  return {friendsQuery};
}
