import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { City } from '@/graphql/__generated__/graphql';

import { CITY, cityAsyncThunks } from './cityActions';

import { RequestStatus } from '@/types/types';

interface CityState {
  allCities: RequestStatus & { list: City[] };
  selectedCity: Record<City['id'], RequestStatus & { item: City | null }>;
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
      state.selectedCity[payload].status = 'idle';
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
        state.allCities.list = action.payload;
      })

      // Single City
      .addCase(
        cityAsyncThunks.loadCityById.pending,
        (state, { meta: { arg } }) => {
          state.selectedCity[arg] = { status: 'loading', item: null };
        },
      )
      .addCase(
        cityAsyncThunks.loadCityById.rejected,
        (state, { meta: { arg } }) => {
          state.selectedCity[arg].status = 'failed';
        },
      )
      .addCase(
        cityAsyncThunks.loadCityById.fulfilled,
        (state, { meta: { arg }, payload }) => {
          state.selectedCity[arg].status = 'succeeded';
          state.selectedCity[arg].item = payload;
        },
      );
  },
});

export const { actions: citySliceActions } = citySlice;
export default citySlice.reducer;
