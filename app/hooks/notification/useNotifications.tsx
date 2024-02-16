import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {useUserContext} from '../../contexts/UserContext';
import Notification from '../../apis/notification/Notification';

const useNotifications = () => {
  const {
    useApi: {client},
    userState: {user},
  } = useUserContext();
  const noti = new Notification(client);
  const queryClient = useQueryClient();

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

  const {data: notificationStatusQuery, refetch: refetchNotiStatusQuery} =
    useQuery({
      queryKey: ['notifications', 'status', user?.id],
      queryFn: () => noti.getNotificationStatus(),
      select: data => data.isPermit,
    });

  const {mutateAsync: permitNotificationQuery} = useMutation({
    mutationFn: (deviceToken: string) => noti.permitNotification(deviceToken),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'status', user?.id],
      }),
  });

  const {mutate: disallowNotificationQuery} = useMutation({
    mutationFn: () => noti.disallowNotification(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'status', user?.id],
      }),
  });

  return {
    hasUnReadQuery,
    refetchHasUnRead,
    notificationsQuery,
    refetchNotificationsQuery,
    notificationStatusQuery,
    refetchNotiStatusQuery,
    permitNotificationQuery,
    disallowNotificationQuery,
  };
};

export default useNotifications;
