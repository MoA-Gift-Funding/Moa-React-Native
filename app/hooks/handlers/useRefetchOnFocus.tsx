import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';

export const useRefetchOnFocus = (refetch = () => {}, canRefetch = true) => {
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setIsScreenFocused(true);
      return () => setIsScreenFocused(false);
    }, []),
  );

  const fetchAgain = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isScreenFocused && canRefetch) {
      fetchAgain();
    }
  }, [canRefetch, isScreenFocused, fetchAgain]);
};
