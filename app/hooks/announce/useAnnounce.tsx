import React from 'react';
import Announce from '../../apis/announce/Announce';
import {useUserContext} from '../../contexts/UserContext';
import {useQuery} from '@tanstack/react-query';

const useAnnounce = () => {
  const {
    useApi: {client},
  } = useUserContext();
  const announce = new Announce(client);

  const {data: AnnouncesQuery, refetch: refetchAnnouncesQuery} = useQuery({
    queryKey: ['announces'],
    queryFn: () => announce.getAnnouncements(),
  });
  return {AnnouncesQuery, refetchAnnouncesQuery};
};

export default useAnnounce;
