import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  City,
  GetCitiesQuery,
  GetCityPlaceQuery,
} from '@/graphql/__generated__/graphql';

import { CITY, cityAsyncThunks } from './city.actions';

import { ItemBaseProps, ListBaseProps } from '@/types/types';

interface CityState {
  allCities: ListBaseProps<NonNullable<GetCitiesQuery['allCities']>>;
  selectedCity: Record<
    City['id'],
    {
      city: ItemBaseProps<City | null>;
      place: ListBaseProps<NonNullable<GetCityPlaceQuery['allPlaces']>>;
    }
  >;
}

const initialState: CityState = {
  allCities: {
    status: 'idle',
    list: [],
  },
  selectedCity: {},
};

const citySlice = createSlice({
  name: CITY,
  initialState,
  reducers: {
    clearAllCities(state) {
      state.allCities = initialState.allCities;
    },
    clearSelectedCity(state, { payload }: PayloadAction<City['id']>) {
      state.selectedCity[payload].city.status = 'idle';
    },
    clearSelectedCityPlace(state, { payload }: PayloadAction<City['id']>) {
      state.selectedCity[payload].place.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // All Cities
      .addCase(cityAsyncThunks.loadAllCities.pending, (state) => {
        state.allCities.status = 'loading';
        state.allCities.list = [];
      })
      .addCase(cityAsyncThunks.loadAllCities.rejected, (state) => {
        state.allCities.status = 'failed';
        state.allCities.list = [];
      })
      .addCase(cityAsyncThunks.loadAllCities.fulfilled, (state, action) => {
        state.allCities.status = 'succeeded';
        state.allCities.list = action.payload?.allCities || [];
      })

      // Single City
      .addCase(
        cityAsyncThunks.loadCityById.pending,
        (state, { meta: { arg } }) => {
          const currentSelectedCity = state.selectedCity[arg.id];
          if (!currentSelectedCity) {
            state.selectedCity[arg.id] = {
              city: { status: 'loading', item: null },
              place: { status: 'idle', list: [] },
            };
          } else {
            currentSelectedCity.city.status = 'loading';
          }
        },
      )
      .addCase(
        cityAsyncThunks.loadCityById.rejected,
        (state, { meta: { arg } }) => {
          state.selectedCity[arg.id].city.status = 'failed';
        },
      )
      .addCase(
        cityAsyncThunks.loadCityById.fulfilled,
        (state, { meta: { arg }, payload }) => {
          state.selectedCity[arg.id].city.status = 'succeeded';
          state.selectedCity[arg.id].city.item = payload;
        },
      )

      // Single City Place
      .addCase(
        cityAsyncThunks.loadCityPlace.pending,
        (state, { meta: { arg } }) => {
          const currentSelectedCity = state.selectedCity[arg.id];
          if (!currentSelectedCity) {
            state.selectedCity[arg.id].place = { status: 'idle', list: [] };
          } else {
            currentSelectedCity.place.status = 'loading';
          }
        },
      )
      .addCase(
        cityAsyncThunks.loadCityPlace.rejected,
        (state, { meta: { arg } }) => {
          state.selectedCity[arg.id].place.status = 'failed';
        },
      )
      .addCase(
        cityAsyncThunks.loadCityPlace.fulfilled,
        (state, { meta: { arg }, payload }) => {
          state.selectedCity[arg.id].place.status = 'succeeded';
          state.selectedCity[arg.id].place.list = payload?.allPlaces || [];
        },
      );
  },
});

export const { actions: citySliceActions } = citySlice;
export default citySlice.reducer;
