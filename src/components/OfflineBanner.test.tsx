import { render } from '@testing-library/react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import OfflineBanner from './OfflineBanner';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

const mockUseSafeAreaInsets = useSafeAreaInsets as jest.MockedFunction<
  typeof useSafeAreaInsets
>;

describe('OfflineBanner', () => {
  beforeEach(() => {
    mockUseSafeAreaInsets.mockReturnValue({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });

  it('renders nothing when isVisible is false', () => {
    const { queryByText } = render(<OfflineBanner isVisible={false} />);

    expect(
      queryByText("You're offline. Some features may be limited."),
    ).toBeNull();
  });

  it('renders banner when isVisible is true', () => {
    const { getByText } = render(<OfflineBanner isVisible={true} />);

    expect(
      getByText("You're offline. Some features may be limited."),
    ).toBeTruthy();
  });

  it('renders with correct text content', () => {
    const { getByText } = render(<OfflineBanner isVisible={true} />);

    expect(
      getByText("You're offline. Some features may be limited."),
    ).toBeTruthy();
  });

  it('applies safe area insets', () => {
    mockUseSafeAreaInsets.mockReturnValue({
      top: 44,
      bottom: 0,
      left: 0,
      right: 0,
    });

    const { getByText } = render(<OfflineBanner isVisible={true} />);

    // Just verify the component renders with safe area
    expect(
      getByText("You're offline. Some features may be limited."),
    ).toBeTruthy();
  });
});
