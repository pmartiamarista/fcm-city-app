import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store';

import { CityState } from './initialState';

// Base selectors
export const selectCityState = (state: RootState): CityState => state.city;

export const selectAllCities = (state: RootState) =>
  selectCityState(state).allCities;

export const selectSelectedCity = (cityId: string) => (state: RootState) =>
  selectCityState(state).selectedCity[cityId];

// Selectors for useAllCities hook
export const selectAllCitiesList = createSelector(
  [selectAllCities],
  (allCities) => allCities.list,
);

export const selectAllCitiesStatus = createSelector(
  [selectAllCities],
  (allCities) => allCities.status,
);

// Selectors for useSelectedCity hook
export const selectCityById = (cityId: string) =>
  createSelector(
    [selectSelectedCity(cityId)],
    (selectedCity) => selectedCity?.city || { status: 'idle', item: null },
  );

// Selectors for useSelectedCityPlace hook
export const selectCityPlace = (cityId: string) =>
  createSelector(
    [selectSelectedCity(cityId)],
    (selectedCity) => selectedCity?.place || { status: 'idle', list: [] },
  );
