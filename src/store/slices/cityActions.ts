import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchAllCities, fetchCityById } from '@/api/cityService';
import { City } from '@/graphql/__generated__/graphql';

import { RootState } from '..';

export const CITY = 'city';

export const cityAsyncThunks = {
  loadAllCities: createAsyncThunk<City[]>(
    `${CITY}/loadAllCities`,
    async () => {
      const cities = await fetchAllCities();
      return cities.filter((city): city is City => city !== null);
    },
    {
      condition: (_, { getState }) => {
        const { city } = getState() as RootState;
        return city.allCities.status !== 'loading';
      },
    },
  ),

  loadCityById: createAsyncThunk<City | null, string>(
    `${CITY}/loadCityById`,
    async (arg: City['id']) => {
      const city = await fetchCityById(arg);

      return city;
    },
    {
      condition: (arg, { getState }) => {
        const { city } = getState() as RootState;

        return city.selectedCity?.[arg]?.status !== 'loading';
      },
    },
  ),
};
