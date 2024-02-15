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

  const {data: isNotificationReadQuery} = useQuery({
    queryFn: () => noti.isRead(),
    queryKey: ['notifications', user?.id],
    select: data => data.hasUnread,
  });

  const {data: notificationsQuery} = useQuery({
    queryFn: () => noti.getNotifications(),
    queryKey: ['notifications', user?.id],
  });

  return {isNotificationReadQuery, notificationsQuery};
};

export default useNotifications;
