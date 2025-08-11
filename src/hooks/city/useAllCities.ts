import { useCallback } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { CITY, cityAsyncThunks } from '@/store/slices/cityActions';
import { citySliceActions } from '@/store/slices/citySlice';

import { useStatus } from '../useStatus';

const getState = (state: RootState) => state[CITY].allCities;

export const useAllCities = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(getState);

  const loadAllCities = useCallback(async () => {
    return dispatch(cityAsyncThunks.loadAllCities());
  }, [dispatch]);

  const clearAllCities = useCallback(() => {
    return citySliceActions.clearAllCities();
  }, []);

  return {
    state: {
      ...state,
      ...useStatus({ status: state.status, data: state.list }),
    },
    actions: {
      loadAllCities,
      clearAllCities,
    },
  };
};
