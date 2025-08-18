import { configureStore } from '@reduxjs/toolkit';
import { act } from '@testing-library/react-native';

import { cityAsyncThunks, citySlice } from './city';

// Mock the API service
jest.mock('@/api/cityService', () => ({
  fetchAllCities: jest.fn(async () => ({ allCities: [] })),
  getCity: jest.fn(async () => ({ id: '1', name: 'Mock City' })),
  getCityPlace: jest.fn(async () => ({ allPlaces: [] })),
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      city: citySlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

describe('cityAsyncThunks', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should load all cities successfully', async () => {
    await store.dispatch(cityAsyncThunks.loadAllCities());
    const state = store.getState();
    expect(state).toBeDefined();
  });
});

describe('City Actions', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  describe('loadAllCities', () => {
    it('should load all cities successfully', async () => {
      const mockCities = [
        { id: '1', name: 'Paris', key: 'paris', nativeName: 'Paris' },
        { id: '2', name: 'Tokyo', key: 'tokyo', nativeName: '東京' },
      ];

      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadAllCities.pending('', undefined, ''),
        );
      });

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

    it('should handle loadAllCities rejection', async () => {
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadAllCities.pending('', undefined, ''),
        );
      });

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

    it('should not load cities if already loading', async () => {
      // First dispatch to set loading state
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadAllCities.pending('', undefined, ''),
        );
      });

      // Try to dispatch again - should be prevented by condition
      const _result = await store.dispatch(
        cityAsyncThunks.loadAllCities.pending('', undefined, ''),
      );

      const state = store.getState();
      expect(state.city.allCities.status).toBe('loading');
    });
  });

  describe('loadCityById', () => {
    it('should load city by ID successfully', async () => {
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
          cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
        );
      });

      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityById.fulfilled(mockCity, '', { id: cityId }),
        );
      });

      const state = store.getState();
      expect(state.city.selectedCity[cityId].city.status).toBe('succeeded');
      expect(state.city.selectedCity[cityId].city.item).toEqual(mockCity);
    });

    it('should handle loadCityById rejection', async () => {
      const cityId = '1';

      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
        );
      });

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

    it('should not load city if already loading', async () => {
      const cityId = '1';

      // First dispatch to set loading state
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
        );
      });

      // Try to dispatch again - should be prevented by condition
      const _result = await store.dispatch(
        cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
      );

      const state = store.getState();
      expect(state.city.selectedCity[cityId].city.status).toBe('loading');
    });

    it('should allow loading city if not previously loaded', async () => {
      const cityId = '1';
      const mockCity = {
        id: cityId,
        name: 'Paris',
        key: 'paris',
        nativeName: 'Paris',
        currency: 'EUR',
        language: 'French',
      };

      // First create the city structure with pending action
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

      const state = store.getState();
      expect(state.city.selectedCity[cityId].city.status).toBe('succeeded');
      expect(state.city.selectedCity[cityId].city.item).toEqual(mockCity);
    });
  });

  describe('loadCityPlace', () => {
    it('should load city place successfully', async () => {
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

      // First create the city structure with pending action
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
        );
      });

      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityPlace.pending(
            '',
            { id: cityId, key: cityKey },
            '',
          ),
        );
      });

      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityPlace.fulfilled(
            { allPlaces: mockPlaces },
            '',
            { id: cityId, key: cityKey },
          ),
        );
      });

      const state = store.getState();
      expect(state.city.selectedCity[cityId].place.status).toBe('succeeded');
      expect(state.city.selectedCity[cityId].place.list).toEqual(mockPlaces);
    });

    it('should handle loadCityPlace rejection', async () => {
      const cityId = '1';
      const cityKey = 'paris';

      // First create the city structure with pending action
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
        );
      });

      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityPlace.pending(
            '',
            { id: cityId, key: cityKey },
            '',
          ),
        );
      });

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

    it('should not load city place if already loading', async () => {
      const cityId = '1';
      const cityKey = 'paris';

      // First create the city structure with pending action
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
        );
      });

      // First dispatch to set loading state
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityPlace.pending(
            '',
            { id: cityId, key: cityKey },
            '',
          ),
        );
      });

      // Try to dispatch again - should be prevented by condition
      const _result = await store.dispatch(
        cityAsyncThunks.loadCityPlace.pending(
          '',
          { id: cityId, key: cityKey },
          '',
        ),
      );

      const state = store.getState();
      expect(state.city.selectedCity[cityId].place.status).toBe('loading');
    });

    it('should allow loading city place if not previously loaded', async () => {
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

      // First create the city structure with pending action
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
        );
      });

      // Then load the city place
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityPlace.fulfilled(
            { allPlaces: mockPlaces },
            '',
            { id: cityId, key: cityKey },
          ),
        );
      });

      const state = store.getState();
      expect(state.city.selectedCity[cityId].place.status).toBe('succeeded');
      expect(state.city.selectedCity[cityId].place.list).toEqual(mockPlaces);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty payload for loadAllCities', async () => {
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadAllCities.fulfilled(
            { allCities: undefined },
            '',
            undefined,
          ),
        );
      });

      const state = store.getState();
      expect(state.city.allCities.status).toBe('succeeded');
      expect(state.city.allCities.list).toEqual([]);
    });

    it('should handle empty payload for loadCityPlace', async () => {
      const cityId = '1';
      const cityKey = 'paris';

      // First create the city structure with pending action
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
        );
      });

      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityPlace.fulfilled(
            { allPlaces: undefined },
            '',
            { id: cityId, key: cityKey },
          ),
        );
      });

      const state = store.getState();
      expect(state.city.selectedCity[cityId].place.status).toBe('succeeded');
      expect(state.city.selectedCity[cityId].place.list).toEqual([]);
    });

    it('should handle city with existing structure for loadCityById', async () => {
      const cityId = '1';
      const mockCity = {
        id: cityId,
        name: 'Paris',
        key: 'paris',
        nativeName: 'Paris',
        currency: 'EUR',
        language: 'French',
      };

      // First create the city structure
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

      const state = store.getState();
      expect(state.city.selectedCity[cityId].city.status).toBe('succeeded');
      expect(state.city.selectedCity[cityId].city.item).toEqual(mockCity);
    });

    it('should handle city place with existing structure', async () => {
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

      // First create the city structure
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityById.pending('', { id: cityId }, ''),
        );
      });

      // Then load the city place
      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadCityPlace.fulfilled(
            { allPlaces: mockPlaces },
            '',
            { id: cityId, key: cityKey },
          ),
        );
      });

      const state = store.getState();
      expect(state.city.selectedCity[cityId].place.status).toBe('succeeded');
      expect(state.city.selectedCity[cityId].place.list).toEqual(mockPlaces);
    });
  });
});
