import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  cityAsyncThunks,
  citySliceActions,
  selectCityPlace,
} from '@/store/slices/city';

import { City } from '@/graphql/__generated__/graphql';
import { createActionsStateReturn } from '@/utils/createActionsStateReturn/createActionsStateReturn';

import { useStatus } from '../useStatus';

type UseSelectedCityPlaceProps = Pick<City, 'id' | 'key'>;

export const useSelectedCityPlace = (props: UseSelectedCityPlaceProps) => {
  const dispatch = useAppDispatch();
  const place = useAppSelector(selectCityPlace(props.id));

  const loadCityPlace = useCallback(async () => {
    return dispatch(
      cityAsyncThunks.loadCityPlace({ id: props?.id, key: props?.key }),
    );
  }, [dispatch, props?.id, props?.key]);

  const clearSelectedCity = useCallback(() => {
    return dispatch(citySliceActions.clearSelectedCityPlace(props.id));
  }, [dispatch, props.id]);

  return createActionsStateReturn(
    {
      loadCityPlace,
      clearSelectedCity,
    },
    {
      ...place,
      ...useStatus({ status: place.status, data: place.list }),
    },
  );
};
