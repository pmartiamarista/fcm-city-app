import { useCallback } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { CITY, cityAsyncThunks } from '@/store/slices/city.actions';
import { citySliceActions } from '@/store/slices/city.slice';

import { createActionsStateReturn } from '@/utils/createActionsStateReturn/createActionsStateReturn';

import { useStatus } from '../useStatus';

const getState = (state: RootState) => state[CITY].allCities;

export const useAllCities = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(getState);

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
      ...state,
      ...useStatus({ status: state.status, data: state.list }),
    },
  );
};
