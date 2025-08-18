import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './index';
import { cityAsyncThunks, citySlice, citySliceActions } from './slices/city';

// Mock the API service
jest.mock('@/api/cityService', () => ({
  fetchAllCities: jest.fn(),
  getCity: jest.fn(),
  getCityPlace: jest.fn(),
}));

const _createTestStore = () => {
  return configureStore({
    reducer: {
      city: citySlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('Redux Store Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct initial state', () => {
    const initialState = store.getState();

    expect(initialState.city.allCities).toEqual({
      status: 'idle',
      list: [],
    });

    expect(initialState.city.selectedCity).toEqual({});
  });

  it('handles loadAllCities pending state', async () => {
    const { result: _result } = renderHook(() => store.getState(), { wrapper });

    await act(async () => {
      store.dispatch(cityAsyncThunks.loadAllCities.pending('', undefined, ''));
    });

    const state = store.getState();
    expect(state.city.allCities.status).toBe('loading');
    expect(state.city.allCities.list).toEqual([]);
  });

  it('handles loadAllCities fulfilled state', async () => {
    const mockCities = [
      { id: '1', name: 'Paris', key: 'paris', nativeName: 'Paris' },
      { id: '2', name: 'Tokyo', key: 'tokyo', nativeName: '東京' },
    ];

    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadAllCities.fulfilled(
          { allCities: mockCities },
          '',
          undefined,
        ),
      );
    });

    const state = store.getState();
    expect(state.city.allCities.status).toBe('succeeded');
    expect(state.city.allCities.list).toEqual(mockCities);
  });

  it('handles loadAllCities rejected state', async () => {
    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadAllCities.rejected(
          new Error('API Error'),
          '',
          undefined,
        ),
      );
    });

    const state = store.getState();
    expect(state.city.allCities.status).toBe('failed');
    expect(state.city.allCities.list).toEqual([]);
  });

  it('handles loadCityById pending state', async () => {
    const cityId = '1';

    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
      );
    });

    const state = store.getState();
    expect(state.city.selectedCity[cityId].city.status).toBe('loading');
    expect(state.city.selectedCity[cityId].city.item).toBeNull();
  });

  it('handles loadCityById fulfilled state', async () => {
    const cityId = '1';
    const mockCity = {
      id: cityId,
      name: 'Paris',
      key: 'paris',
      nativeName: 'Paris',
      currency: 'EUR',
      language: 'French',
    };

    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadCityById.fulfilled(mockCity, '', { id: cityId }),
      );
    });

    const state = store.getState();
    expect(state.city.selectedCity[cityId].city.status).toBe('succeeded');
    expect(state.city.selectedCity[cityId].city.item).toEqual(mockCity);
  });

  it('handles loadCityById rejected state', async () => {
    const cityId = '1';

    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadCityById.rejected(new Error('API Error'), '', {
          id: cityId,
        }),
      );
    });

    const state = store.getState();
    expect(state.city.selectedCity[cityId].city.status).toBe('failed');
  });

  it('handles loadCityPlace pending state', async () => {
    const cityId = '1';
    const cityKey = 'paris';

    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadCityPlace.pending(
          '',
          { id: cityId, key: cityKey },
          '',
        ),
      );
    });

    const state = store.getState();
    expect(state.city.selectedCity[cityId].place.status).toBe('loading');
  });

  it('handles loadCityPlace fulfilled state', async () => {
    const cityId = '1';
    const cityKey = 'paris';
    const mockPlaces = [
      {
        key: 'eiffel-tower',
        place: {
          type: 'monument',
          name: 'Eiffel Tower',
          coordinates: [48.8584, 2.2945] as [number, number],
        },
      },
    ];

    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadCityPlace.fulfilled({ allPlaces: mockPlaces }, '', {
          id: cityId,
          key: cityKey,
        }),
      );
    });

    const state = store.getState();
    expect(state.city.selectedCity[cityId].place.status).toBe('succeeded');
    expect(state.city.selectedCity[cityId].place.list).toEqual(mockPlaces);
  });

  it('handles loadCityPlace rejected state', async () => {
    const cityId = '1';
    const cityKey = 'paris';

    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadCityPlace.rejected(new Error('API Error'), '', {
          id: cityId,
          key: cityKey,
        }),
      );
    });

    const state = store.getState();
    expect(state.city.selectedCity[cityId].place.status).toBe('failed');
  });

  it('clears all cities when clearAllCities is dispatched', async () => {
    // First load some cities
    const mockCities = [
      { id: '1', name: 'Paris', key: 'paris', nativeName: 'Paris' },
    ];

    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadAllCities.fulfilled(
          { allCities: mockCities },
          '',
          undefined,
        ),
      );
    });

    // Then clear them
    await act(async () => {
      store.dispatch(citySliceActions.clearAllCities());
    });

    const state = store.getState();
    expect(state.city.allCities.status).toBe('idle');
    expect(state.city.allCities.list).toEqual([]);
  });

  it('clears selected city when clearSelectedCity is dispatched', async () => {
    const cityId = '1';
    const mockCity = {
      id: cityId,
      name: 'Paris',
      key: 'paris',
      nativeName: 'Paris',
      currency: 'EUR',
      language: 'French',
    };

    // First initialize the city structure with pending action
    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
      );
    });

    // Then load the city
    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadCityById.fulfilled(mockCity, '', { id: cityId }),
      );
    });

    // Then clear it
    await act(async () => {
      store.dispatch(citySliceActions.clearSelectedCity(cityId));
    });

    const state = store.getState();
    expect(state.city.selectedCity[cityId].city.status).toBe('idle');
  });

  it('maintains separate state for different cities', async () => {
    const city1 = {
      id: '1',
      name: 'Paris',
      key: 'paris',
      nativeName: 'Paris',
      currency: 'EUR',
      language: 'French',
    };
    const city2 = {
      id: '2',
      name: 'Tokyo',
      key: 'tokyo',
      nativeName: '東京',
      currency: 'JPY',
      language: 'Japanese',
    };

    // First initialize the city structures with pending actions
    await act(async () => {
      store.dispatch(cityAsyncThunks.loadCityById.pending('', { id: '1' }, ''));
      store.dispatch(cityAsyncThunks.loadCityById.pending('', { id: '2' }, ''));
    });

    // Then load the cities
    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadCityById.fulfilled(city1, '', { id: '1' }),
      );
      store.dispatch(
        cityAsyncThunks.loadCityById.fulfilled(city2, '', { id: '2' }),
      );
    });

    const state = store.getState();
    expect(state.city.selectedCity['1'].city.item).toEqual(city1);
    expect(state.city.selectedCity['2'].city.item).toEqual(city2);
  });

  it('handles multiple async operations correctly', async () => {
    const cityId = '1';

    // Start multiple operations
    await act(async () => {
      store.dispatch(
        cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
      );
      store.dispatch(
        cityAsyncThunks.loadCityPlace.pending(
          '',
          { id: cityId, key: 'paris' },
          '',
        ),
      );
    });

    const state = store.getState();
    expect(state.city.selectedCity[cityId].city.status).toBe('loading');
    expect(state.city.selectedCity[cityId].place.status).toBe('loading');
  });
});
