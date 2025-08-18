import {
  City,
  GetCitiesQuery,
  GetCityPlaceQuery,
} from '@/graphql/__generated__/graphql';

import { ItemBaseProps, ListBaseProps } from '@/types/types';

export interface CityState {
  allCities: ListBaseProps<NonNullable<GetCitiesQuery['allCities']>>;
  selectedCity: Record<
    City['id'],
    {
      city: ItemBaseProps<City | null>;
      place: ListBaseProps<NonNullable<GetCityPlaceQuery['allPlaces']>>;
    }
  >;
}

export const cityInitialState: CityState = {
  allCities: {
    status: 'idle',
    list: [],
  },
  selectedCity: {},
};
