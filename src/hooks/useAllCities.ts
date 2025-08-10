import { useEffect } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { CITY, cityAsyncThunks } from '@/store/slices/cityActions';

import { getStatus } from '@/utils/getStatus/getStatus';

const getState = (state: RootState) => state[CITY].allCities;

export const useAllCities = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(getState);

  useEffect(() => {
    void dispatch(cityAsyncThunks.loadAllCities());
  }, [dispatch]);

  return {
    list: state.list,
    ...getStatus({ status: state.status, data: state.list }),
  };
};
