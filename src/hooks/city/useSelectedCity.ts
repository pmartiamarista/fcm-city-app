import { createSelector } from '@reduxjs/toolkit';
import { useCallback } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { CITY, cityAsyncThunks } from '@/store/slices/cityActions';
import { citySliceActions } from '@/store/slices/citySlice';

import { City } from '@/graphql/__generated__/graphql';

import { useStatus } from '../useStatus';

type UseSelectedCityProps = Pick<City, 'id'>;

const getState = (state: RootState) => state[CITY].selectedCity;

const getResourceSelector = createSelector(
  [
    getState,
    (_, payload: UseSelectedCityProps) => {
      return payload.id;
    },
  ],
  (city, id) => {
    return city[id]?.city || { status: 'idle', item: null };
  },
);

export const useSelectedCity = (props: UseSelectedCityProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => getResourceSelector(state, props));

  const loadCityById = useCallback(async () => {
    return dispatch(cityAsyncThunks.loadCityById({ id: props?.id }));
  }, [dispatch, props?.id]);

  const clearSelectedCity = useCallback(() => {
    return citySliceActions.clearSelectedCity(props.id);
  }, [props.id]);

  return {
    state: {
      ...state,
      ...useStatus({ status: state.status, data: state.item }),
    },
    actions: {
      loadCityById,
      clearSelectedCity,
    },
  };
};
