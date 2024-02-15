import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {useUserContext} from '../../contexts/UserContext';
import Notification from '../../apis/notification/Notification';

const useNotifications = () => {
  const {
    useApi: {client},
    userState: {user},
  } = useUserContext();
  const noti = new Notification(client);

  const {data: hasUnReadQuery, refetch: refetchHasUnRead} = useQuery({
    queryFn: () => noti.hasUnRead(),
    queryKey: ['unRead', 'notifications', user?.id],
    select: data => data.hasUnread,
  });

  const {data: notificationsQuery, refetch: refetchNotificationsQuery} =
    useQuery({
      queryFn: () => noti.getNotifications(),
      queryKey: ['notifications', user?.id],
    });

  return {
    hasUnReadQuery,
    refetchHasUnRead,
    notificationsQuery,
    refetchNotificationsQuery,
  };
};

export default useNotifications;
