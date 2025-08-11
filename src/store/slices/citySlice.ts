import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { City, GetCitiesQuery, Place } from '@/graphql/__generated__/graphql';

import { CITY, cityAsyncThunks } from './cityActions';

import { RequestStatus } from '@/types/types';

interface CityState {
  allCities: RequestStatus & { list: NonNullable<GetCitiesQuery['allCities']> };
  selectedCity: Record<
    City['id'],
    {
      city: RequestStatus & { item: City | null };
      place: RequestStatus & { item: Place | null };
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
              place: { status: 'idle', item: null },
            };
          } else {
            currentSelectedCity.city.status = 'loading';
            currentSelectedCity.place.status = 'loading';
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
      );
  },
});

export const { actions: citySliceActions } = citySlice;
export default citySlice.reducer;
