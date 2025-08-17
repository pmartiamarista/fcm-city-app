/* eslint-disable @typescript-eslint/no-explicit-any */
import NetInfo from '@react-native-community/netinfo';
import { act, renderHook } from '@testing-library/react-native';

import { useOfflineStatus } from './useOfflineStatus';

// Mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
  addEventListener: jest.fn(),
}));

const mockNetInfo = NetInfo as jest.Mocked<typeof NetInfo>;

describe('useOfflineStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns initial state', () => {
    mockNetInfo.fetch.mockResolvedValue({
      isConnected: true,
      type: 'wifi',
    } as any);
    mockNetInfo.addEventListener.mockReturnValue(() => {});

    const { result } = renderHook(() => useOfflineStatus());

    expect(result.current.isOffline).toBe(false);
    expect(result.current.isConnected).toBe(null);
    expect(result.current.connectionType).toBe(null);
  });

  it('fetches initial state successfully', async () => {
    const mockState = {
      isConnected: true,
      type: 'wifi',
    } as any;

    mockNetInfo.fetch.mockResolvedValue(mockState);
    mockNetInfo.addEventListener.mockReturnValue(() => {});

    const { result } = renderHook(() => useOfflineStatus());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current.isOffline).toBe(false);
    expect(result.current.isConnected).toBe(true);
    expect(result.current.connectionType).toBe('wifi');
  });

  it('handles initial state fetch error gracefully', async () => {
    mockNetInfo.fetch.mockRejectedValue(new Error('Network error'));
    mockNetInfo.addEventListener.mockReturnValue(() => {});

    const { result } = renderHook(() => useOfflineStatus());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current.isOffline).toBe(true);
    expect(result.current.isConnected).toBe(false);
    expect(result.current.connectionType).toBe(null);
  });

  it('updates state when network status changes', async () => {
    const mockState = {
      isConnected: true,
      type: 'wifi',
    } as any;

    mockNetInfo.fetch.mockResolvedValue(mockState);

    let listenerCallback: any = null;
    mockNetInfo.addEventListener.mockImplementation((callback) => {
      listenerCallback = callback;
      return () => {};
    });

    const { result } = renderHook(() => useOfflineStatus());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    expect(result.current.isConnected).toBe(true);

    // Simulate network change
    act(() => {
      if (listenerCallback) {
        listenerCallback({ isConnected: false, type: 'none' });
      }
    });

    expect(result.current.isOffline).toBe(true);
    expect(result.current.isConnected).toBe(false);
    expect(result.current.connectionType).toBe('none');
  });

  it('cleans up event listener on unmount', () => {
    const mockUnsubscribe = jest.fn();
    mockNetInfo.fetch.mockResolvedValue({
      isConnected: true,
      type: 'wifi',
    } as any);
    mockNetInfo.addEventListener.mockReturnValue(mockUnsubscribe);

    const { unmount } = renderHook(() => useOfflineStatus());

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });
});
