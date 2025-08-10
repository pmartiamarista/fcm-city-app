import { createSlice } from '@reduxjs/toolkit';

import { City } from '@/graphql/__generated__/graphql';

import { CITY, cityAsyncThunks } from './cityActions';

import { RequestStatus } from '@/types/types';

interface CityState {
  allCities: RequestStatus & { list: City[] };
  selectedCity: RequestStatus & { item: City | null };
}

const initialState: CityState = {
  allCities: {
    status: 'idle',
    list: [],
  },
  selectedCity: {
    status: 'idle',
    item: null,
  },
};

const citySlice = createSlice({
  name: CITY,
  initialState,
  reducers: {
    clearSelectedCity(state) {
      state.selectedCity = {
        status: 'idle',
        item: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // All Cities
      .addCase(cityAsyncThunks.loadAllCities.pending, (state) => {
        state.allCities.status = 'loading';
        state.allCities.list = [];
      })
      .addCase(cityAsyncThunks.loadAllCities.fulfilled, (state, action) => {
        state.allCities.status = 'succeeded';
        state.allCities.list = action.payload;
      })
      .addCase(cityAsyncThunks.loadAllCities.rejected, (state) => {
        state.allCities.status = 'failed';
        state.allCities.list = [];
      })

      // Single City
      .addCase(cityAsyncThunks.loadCityById.pending, (state) => {
        state.selectedCity.status = 'loading';
        state.selectedCity.item = null;
      })
      .addCase(cityAsyncThunks.loadCityById.fulfilled, (state, action) => {
        state.selectedCity.status = 'succeeded';
        state.selectedCity.item = action.payload;
      })
      .addCase(cityAsyncThunks.loadCityById.rejected, (state) => {
        state.selectedCity.status = 'failed';
        state.selectedCity.item = null;
      });
  },
});

export const { clearSelectedCity } = citySlice.actions;
export default citySlice.reducer;
