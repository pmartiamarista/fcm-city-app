import { createSelector } from '@reduxjs/toolkit';
import { useCallback } from 'react';

import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { CITY, cityAsyncThunks } from '@/store/slices/cityActions';
import { citySliceActions } from '@/store/slices/citySlice';

import { City } from '@/graphql/__generated__/graphql';
import { createActionsStateReturn } from '@/utils/createActionsStateReturn/createActionsStateReturn';

import { useStatus } from '../useStatus';

type UseSelectedCityPlaceProps = Pick<City, 'id' | 'key'>;

const getState = (state: RootState) => state[CITY].selectedCity;

const getResourceSelector = createSelector(
  [
    getState,
    (_, payload: UseSelectedCityPlaceProps) => {
      return payload.id;
    },
  ],
  (city, id) => {
    return city[id]?.place || { status: 'idle', item: null };
  },
);

export const useSelectedCityPlace = (props: UseSelectedCityPlaceProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => getResourceSelector(state, props));

  const loadCityPlace = useCallback(async () => {
    return dispatch(
      cityAsyncThunks.loadCityPlace({ id: props?.id, key: props?.key }),
    );
  }, [dispatch, props?.id, props?.key]);

  const clearSelectedCity = useCallback(() => {
    return citySliceActions.clearSelectedCityPlace(props.id);
  }, [props.id]);

  return createActionsStateReturn(
    {
      loadCityPlace,
      clearSelectedCity,
    },
    {
      ...state,
      ...useStatus({ status: state.status, data: state.list }),
    },
  );
};
