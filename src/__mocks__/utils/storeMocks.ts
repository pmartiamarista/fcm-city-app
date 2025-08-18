import { configureStore } from '@reduxjs/toolkit';

import { cityAsyncThunks, citySlice } from '@/store/slices/city';

import { City } from '@/graphql/__generated__/graphql';

/**
 * Creates a test store with city reducer
 * @returns Configured test store
 */
export const createMockStore = () => {
  return configureStore({
    reducer: {
      city: citySlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export { cityAsyncThunks };

export type AppTestStore = ReturnType<typeof createMockStore>;

/**
 * Mock async thunk action creators for testing
 */
export const mockAsyncThunks = {
  loadAllCities: {
    pending: (requestId: string, arg: unknown, _meta: unknown) => ({
      type: cityAsyncThunks.loadAllCities.pending.type,
      payload: undefined,
      meta: { arg, requestId },
    }),
    fulfilled: (payload: unknown, requestId: string, arg: unknown) => ({
      type: cityAsyncThunks.loadAllCities.fulfilled.type,
      payload,
      meta: { arg, requestId },
    }),
    rejected: (error: Error, requestId: string, arg: unknown) => ({
      type: cityAsyncThunks.loadAllCities.rejected.type,
      payload: error,
      meta: { arg, requestId },
      error: { message: error.message },
    }),
  },
  loadCityById: {
    pending: (requestId: string, arg: Pick<City, 'id'>, _meta: unknown) => ({
      type: cityAsyncThunks.loadCityById.pending.type,
      payload: undefined,
      meta: { arg, requestId },
    }),
    fulfilled: (payload: City, requestId: string, arg: Pick<City, 'id'>) => ({
      type: cityAsyncThunks.loadCityById.fulfilled.type,
      payload,
      meta: { arg, requestId },
    }),
    rejected: (error: Error, requestId: string, arg: Pick<City, 'id'>) => ({
      type: cityAsyncThunks.loadCityById.rejected.type,
      payload: error,
      meta: { arg, requestId },
      error: { message: error.message },
    }),
  },
  loadCityPlace: {
    pending: (
      requestId: string,
      arg: Pick<City, 'id' | 'key'>,
      _meta: unknown,
    ) => ({
      type: cityAsyncThunks.loadCityPlace.pending.type,
      payload: undefined,
      meta: { arg, requestId },
    }),
    fulfilled: (
      payload: unknown,
      requestId: string,
      arg: Pick<City, 'id' | 'key'>,
    ) => ({
      type: cityAsyncThunks.loadCityPlace.fulfilled.type,
      payload,
      meta: { arg, requestId },
    }),
    rejected: (
      error: Error,
      requestId: string,
      arg: Pick<City, 'id' | 'key'>,
    ) => ({
      type: cityAsyncThunks.loadCityPlace.rejected.type,
      payload: error,
      meta: { arg, requestId },
      error: { message: error.message },
    }),
  },
};

/**
 * Helper to dispatch multiple actions in sequence
 * @param store - Redux store
 * @param actions - Array of actions to dispatch
 */
export const dispatchActions = (store: unknown, actions: unknown[]) => {
  (actions as unknown[]).forEach((action) =>
    (store as { dispatch: (action: unknown) => void }).dispatch(action),
  );
};

/**
 * Helper to get store state
 * @param store - Redux store
 * @returns Current store state
 */
export const getStoreState = (store: unknown) =>
  (store as { getState: () => unknown }).getState();

/**
 * Helper to get city state from store
 * @param store - Redux store
 * @returns City slice state
 */
export const getCityState = (store: unknown) =>
  (store as { getState: () => { city: unknown } }).getState().city;

/**
 * Helper to get all cities from store
 * @param store - Redux store
 * @returns All cities state
 */
export const getAllCitiesState = (store: unknown) =>
  (store as { getState: () => { city: { allCities: unknown } } }).getState()
    .city.allCities;

/**
 * Helper to get selected city from store
 * @param store - Redux store
 * @param cityId - City ID
 * @returns Selected city state
 */
export const getSelectedCityState = (store: unknown, cityId: string) =>
  (
    store as {
      getState: () => { city: { selectedCity: Record<string, unknown> } };
    }
  ).getState().city.selectedCity[cityId];

/**
 * Helper to get selected city place from store
 * @param store - Redux store
 * @param cityId - City ID
 * @returns Selected city place state
 */
export const getSelectedCityPlaceState = (store: unknown, cityId: string) =>
  (
    store as {
      getState: () => {
        city: { selectedCity: Record<string, { place?: unknown }> };
      };
    }
  ).getState().city.selectedCity[cityId]?.place;
