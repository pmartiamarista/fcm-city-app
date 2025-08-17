import { act, renderHook } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store';

import * as cityService from '@/api/cityService';

import { useAllCities } from './useAllCities';

// Mock the API service
jest.mock('@/api/cityService', () => ({
  fetchAllCities: jest.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useAllCities Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useAllCities(), { wrapper });

    expect(result.current.state.list).toEqual([]);
    expect(result.current.state.status).toBe('idle');
    expect(result.current.state.isLoading).toBe(false);
    expect(result.current.state.isLoaded).toBe(false);
    expect(result.current.state.hasError).toBe(false);
    expect(result.current.state.isEmpty).toBe(false);
  });

  it('provides loadAllCities action', () => {
    const { result } = renderHook(() => useAllCities(), { wrapper });

    expect(typeof result.current.actions.loadAllCities).toBe('function');
  });

  it('provides clearAllCities action', () => {
    const { result } = renderHook(() => useAllCities(), { wrapper });

    expect(typeof result.current.actions.clearAllCities).toBe('function');
  });

  it('loads cities successfully', async () => {
    const mockCities = [
      { id: '1', name: 'Paris', key: 'paris', nativeName: 'Paris' },
      { id: '2', name: 'Tokyo', key: 'tokyo', nativeName: '東京' },
    ];

    const { result } = renderHook(() => useAllCities(), { wrapper });

    // Mock the API response
    const mockFetchAllCities =
      cityService.fetchAllCities as jest.MockedFunction<
        typeof cityService.fetchAllCities
      >;
    mockFetchAllCities.mockResolvedValue({ allCities: mockCities });

    await act(async () => {
      await result.current.actions.loadAllCities();
    });

    expect(result.current.state.list).toEqual(mockCities);
    expect(result.current.state.status).toBe('succeeded');
    expect(result.current.state.isLoaded).toBe(true);
    expect(result.current.state.hasError).toBe(false);
    expect(result.current.state.isEmpty).toBe(false);
  });

  it('handles API errors gracefully', async () => {
    const { result } = renderHook(() => useAllCities(), { wrapper });

    // Mock the API to throw an error
    const mockFetchAllCities =
      cityService.fetchAllCities as jest.MockedFunction<
        typeof cityService.fetchAllCities
      >;
    mockFetchAllCities.mockRejectedValue(new Error('API Error'));

    await act(async () => {
      await result.current.actions.loadAllCities();
    });

    expect(result.current.state.list).toEqual([]);
    expect(result.current.state.status).toBe('failed');
    expect(result.current.state.isLoaded).toBe(false);
    expect(result.current.state.hasError).toBe(true);
    expect(result.current.state.isEmpty).toBe(false);
  });

  it('clears cities when clearAllCities is called', async () => {
    const mockCities = [
      { id: '1', name: 'Paris', key: 'paris', nativeName: 'Paris' },
    ];
    const { result } = renderHook(() => useAllCities(), { wrapper });

    // First load cities
    const mockFetchAllCities =
      cityService.fetchAllCities as jest.MockedFunction<
        typeof cityService.fetchAllCities
      >;
    mockFetchAllCities.mockResolvedValue({ allCities: mockCities });

    await act(async () => {
      await result.current.actions.loadAllCities();
    });

    expect(result.current.state.list).toEqual(mockCities);

    // Then clear them
    await act(async () => {
      result.current.actions.clearAllCities();
    });

    expect(result.current.state.list).toEqual([]);
    expect(result.current.state.status).toBe('idle');
  });

  it('handles loading state correctly', async () => {
    const { result } = renderHook(() => useAllCities(), { wrapper });

    // Mock the API to delay response
    const mockFetchAllCities =
      cityService.fetchAllCities as jest.MockedFunction<
        typeof cityService.fetchAllCities
      >;
    let resolvePromise: (value: {
      allCities: {
        id: string;
        name: string;
        key: string;
        nativeName: string;
      }[];
    }) => void;
    const promise = new Promise<{
      allCities: {
        id: string;
        name: string;
        key: string;
        nativeName: string;
      }[];
    }>((resolve) => {
      resolvePromise = resolve;
    });
    mockFetchAllCities.mockReturnValue(promise);

    // Start loading
    act(() => {
      void result.current.actions.loadAllCities();
    });

    // Check loading state
    expect(result.current.state.status).toBe('loading');
    expect(result.current.state.isLoading).toBe(true);
    expect(result.current.state.isLoaded).toBe(false);

    // Resolve the promise
    await act(async () => {
      resolvePromise({ allCities: [] });
    });
  });

  it('maintains state consistency across re-renders', () => {
    const { result, rerender } = renderHook(() => useAllCities(), { wrapper });

    const initialState = result.current.state;

    rerender({});

    expect(result.current.state).toStrictEqual(initialState);
  });

  it('handles multiple load calls correctly', async () => {
    const { result } = renderHook(() => useAllCities(), { wrapper });

    const mockFetchAllCities =
      cityService.fetchAllCities as jest.MockedFunction<
        typeof cityService.fetchAllCities
      >;
    mockFetchAllCities.mockResolvedValue({ allCities: [] });

    // Call load multiple times
    await act(async () => {
      await Promise.all([
        result.current.actions.loadAllCities(),
        result.current.actions.loadAllCities(),
        result.current.actions.loadAllCities(),
      ]);
    });

    // Should only call API once due to condition check
    expect(mockFetchAllCities).toHaveBeenCalledTimes(1);
  });

  it('provides correct action names', () => {
    const { result } = renderHook(() => useAllCities(), { wrapper });

    expect(result.current.actions).toHaveProperty('loadAllCities');
    expect(result.current.actions).toHaveProperty('clearAllCities');
  });

  it('provides correct state properties', () => {
    const { result } = renderHook(() => useAllCities(), { wrapper });

    expect(result.current.state).toHaveProperty('list');
    expect(result.current.state).toHaveProperty('status');
    expect(result.current.state).toHaveProperty('isLoading');
    expect(result.current.state).toHaveProperty('isLoaded');
    expect(result.current.state).toHaveProperty('hasError');
    expect(result.current.state).toHaveProperty('isEmpty');
  });
});
