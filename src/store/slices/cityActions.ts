import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchAllCities, getCity } from '@/api/cityService';
import { City } from '@/graphql/__generated__/graphql';

import { RootState } from '..';

export const CITY = 'city';

export const cityAsyncThunks = {
  loadAllCities: createAsyncThunk(
    `${CITY}/loadAllCities`,
    async () => {
      const cities = await fetchAllCities();
      return cities;
    },
    {
      condition: (_, { getState }) => {
        const { city } = getState() as RootState;
        return city.allCities.status !== 'loading';
      },
    },
  ),

  loadCityById: createAsyncThunk(
    `${CITY}/loadCityById`,
    async (arg: Pick<City, 'id'>) => {
      return await getCity(arg);
    },
    {
      condition: (arg, { getState }) => {
        const { city } = getState() as RootState;

        const selectedCity = city.selectedCity?.[arg.id]?.city;

        if (!selectedCity) {
          return true;
        }

        return selectedCity?.status !== 'loading';
      },
    },
  ),
};
