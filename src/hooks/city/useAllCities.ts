import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  cityAsyncThunks,
  citySliceActions,
  selectAllCities,
} from '@/store/slices/city';

import { createActionsStateReturn } from '@/utils/createActionsStateReturn/createActionsStateReturn';

import { useStatus } from '../useStatus';

export const useAllCities = () => {
  const dispatch = useAppDispatch();
  const allCities = useAppSelector(selectAllCities);

  const loadAllCities = useCallback(async () => {
    return dispatch(cityAsyncThunks.loadAllCities());
  }, [dispatch]);

  const clearAllCities = useCallback(() => {
    return dispatch(citySliceActions.clearAllCities());
  }, [dispatch]);

  return createActionsStateReturn(
    {
      loadAllCities,
      clearAllCities,
    },
    {
      ...allCities,
      ...useStatus({ status: allCities.status, data: allCities.list }),
    },
  );
};
