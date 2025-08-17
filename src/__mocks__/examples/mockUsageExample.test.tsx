import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

// Import our mock utilities
import {
  createMockCities,
  createMockCity,
  createMockStore,
  mockAsyncThunks,
  MockChip,
  mockCityService,
  MockIconButton,
  resetServiceMocks,
} from '../index';

// Example component to test
const ExampleComponent = ({
  city,
  onPress,
}: {
  city: unknown;
  onPress: () => void;
}) => (
  <MockChip onPress={onPress}>
    {(city as { name: string; nativeName: string }).name} -{' '}
    {(city as { name: string; nativeName: string }).nativeName}
  </MockChip>
);

describe('Mock Usage Examples', () => {
  beforeEach(() => {
    resetServiceMocks();
  });

  describe('City Mocks', () => {
    it('should create a mock city with default values', () => {
      const mockCity = createMockCity();

      expect(mockCity).toEqual({
        id: '1',
        name: 'Paris',
        key: 'paris',
        nativeName: 'Paris',
        currency: 'EUR',
        language: 'French',
      });
    });

    it('should create a mock city with custom overrides', () => {
      const mockCity = createMockCity({
        id: '2',
        name: 'Tokyo',
        currency: 'JPY',
      });

      expect(mockCity.id).toBe('2');
      expect(mockCity.name).toBe('Tokyo');
      expect(mockCity.currency).toBe('JPY');
      expect(mockCity.language).toBe('French'); // Default value
    });

    it('should create multiple mock cities', () => {
      const mockCities = createMockCities(3);

      expect(mockCities).toHaveLength(3);
      expect(mockCities[0]?.name).toBe('Paris');
      expect(mockCities[1]?.name).toBe('Tokyo');
      expect(mockCities[2]?.name).toBe('Tokyo'); // Default behavior for 3rd city
    });
  });

  describe('Store Mocks', () => {
    it('should create a mock store', () => {
      const store = createMockStore();
      const state = store.getState();

      expect(state.city).toBeDefined();
      expect(state.city.allCities.status).toBe('idle');
      expect(state.city.allCities.list).toEqual([]);
    });

    it('should dispatch async thunk actions', async () => {
      const store = createMockStore();
      const mockCities = createMockCities(2);

      // Dispatch pending action
      store.dispatch(
        mockAsyncThunks.loadAllCities.pending('request-1', undefined, 'meta'),
      );

      expect(store.getState().city.allCities.status).toBe('loading');

      // Dispatch fulfilled action
      store.dispatch(
        mockAsyncThunks.loadAllCities.fulfilled(
          { allCities: mockCities },
          'request-1',
          undefined,
        ),
      );

      expect(store.getState().city.allCities.status).toBe('succeeded');
      expect(store.getState().city.allCities.list).toEqual(mockCities);
    });
  });

  describe('Component Mocks', () => {
    it('should render mock components', () => {
      const mockOnPress = jest.fn();
      const mockCity = createMockCity();

      const { getByTestId } = render(
        <ExampleComponent city={mockCity} onPress={mockOnPress} />,
      );

      const chip = getByTestId('chip');
      expect(chip).toBeTruthy();

      fireEvent.press(chip);
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should render mock icon button', () => {
      const mockOnPress = jest.fn();

      const { getByTestId } = render(
        <MockIconButton icon='city' onPress={mockOnPress} />,
      );

      const button = getByTestId('icon-button');
      expect(button).toBeTruthy();

      fireEvent.press(button);
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Service Mocks', () => {
    it('should mock city service', async () => {
      const mockCities = createMockCities(2);
      mockCityService.fetchAllCities.mockResolvedValue(mockCities);

      const result = await mockCityService.fetchAllCities();

      expect(result).toEqual(mockCities);
      expect(mockCityService.fetchAllCities).toHaveBeenCalledTimes(1);
    });

    it('should reset service mocks', async () => {
      mockCityService.fetchAllCities.mockResolvedValue([]);

      resetServiceMocks();

      // Should be back to default mock value
      await expect(mockCityService.fetchAllCities()).resolves.toEqual(
        createMockCities(),
      );
    });
  });

  describe('Integration Example', () => {
    it('should test a complete flow with mocks', async () => {
      const store = createMockStore();
      const mockCities = createMockCities(2);

      // Simulate API call
      mockCityService.fetchAllCities.mockResolvedValue(mockCities);

      // Simulate Redux actions
      await act(async () => {
        store.dispatch(
          mockAsyncThunks.loadAllCities.pending('request-1', undefined, 'meta'),
        );
      });

      await act(async () => {
        store.dispatch(
          mockAsyncThunks.loadAllCities.fulfilled(
            { allCities: mockCities },
            'request-1',
            undefined,
          ),
        );
      });

      // Verify state
      const state = store.getState();
      expect(state.city.allCities.status).toBe('succeeded');
      expect(state.city.allCities.list).toEqual(mockCities);

      // Test component rendering
      const { getByTestId } = render(
        <ExampleComponent city={mockCities[0]} onPress={() => {}} />,
      );

      expect(getByTestId('chip')).toBeTruthy();
    });
  });
});
