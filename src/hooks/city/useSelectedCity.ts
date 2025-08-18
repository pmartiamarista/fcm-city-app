import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  cityAsyncThunks,
  citySliceActions,
  selectCityById,
} from '@/store/slices/city';

import { City } from '@/graphql/__generated__/graphql';
import { createActionsStateReturn } from '@/utils/createActionsStateReturn/createActionsStateReturn';

import { useStatus } from '../useStatus';

type UseSelectedCityProps = Pick<City, 'id'>;

export const useSelectedCity = (props: UseSelectedCityProps) => {
  const dispatch = useAppDispatch();
  const city = useAppSelector(selectCityById(props.id));

  const loadCityById = useCallback(async () => {
    return dispatch(cityAsyncThunks.loadCityById({ id: props?.id }));
  }, [dispatch, props?.id]);

  const clearSelectedCity = useCallback(() => {
    return dispatch(citySliceActions.clearSelectedCity(props.id));
  }, [dispatch, props.id]);

  return createActionsStateReturn(
    {
      loadCityById,
      clearSelectedCity,
    },
    {
      ...city,
      ...useStatus({ status: city.status, data: city.item }),
    },
  );
};
