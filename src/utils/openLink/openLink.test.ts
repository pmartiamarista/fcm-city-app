import { Alert, Linking } from 'react-native';

import { openLink } from './openLink';

jest.mock('react-native', () => ({
  Linking: {
    canOpenURL: jest.fn(),
    openURL: jest.fn(),
  },
  Alert: {
    alert: jest.fn(),
  },
}));

describe('openLink', () => {
  const validUrl = 'https://example.com';
  const invalidUrl = 'example.com';
  const customSchemeUrl = 'myapp://open';
  const geoUrl = 'geo:37.7749,-122.4194';
  const telUrl = 'tel:+34600111222';
  const smsUrl = 'sms:+34600111222';
  const intentUrl =
    'intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('opens the URL if supported', async () => {
    (Linking.canOpenURL as jest.Mock).mockResolvedValue(true);

    const result = await openLink(validUrl);

    expect(Linking.canOpenURL).toHaveBeenCalledWith(validUrl);
    expect(Linking.openURL).toHaveBeenCalledWith(validUrl);
    expect(result).toEqual({ success: true });
  });

  it('shows alert if URL is not supported', async () => {
    (Linking.canOpenURL as jest.Mock).mockResolvedValue(false);

    const result = await openLink(validUrl);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Unsupported Link',
      'This link cannot be opened on your device.',
    );
    expect(result).toEqual({ success: false });
  });

  it('shows alert on unexpected error', async () => {
    (Linking.canOpenURL as jest.Mock).mockRejectedValue(new Error('fail'));

    const result = await openLink(validUrl);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'An unexpected error occurred while trying to open the link.',
    );
    expect(result).toEqual({ success: false });
  });

  it('shows alert if URL is missing protocol', async () => {
    const result = await openLink(invalidUrl);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Invalid URL',
      'The provided URL is not valid.',
    );
    expect(Linking.canOpenURL).not.toHaveBeenCalled();
    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(result).toEqual({ success: false });
  });

  it('handles custom app scheme (e.g., myapp://)', async () => {
    (Linking.canOpenURL as jest.Mock).mockResolvedValue(true);

    const result = await openLink(customSchemeUrl);

    expect(Linking.canOpenURL).toHaveBeenCalledWith(customSchemeUrl);
    expect(Linking.openURL).toHaveBeenCalledWith(customSchemeUrl);
    expect(result).toEqual({ success: true });
  });

  it('handles geo: scheme', async () => {
    (Linking.canOpenURL as jest.Mock).mockResolvedValue(true);

    const result = await openLink(geoUrl);

    expect(Linking.canOpenURL).toHaveBeenCalledWith(geoUrl);
    expect(Linking.openURL).toHaveBeenCalledWith(geoUrl);
    expect(result).toEqual({ success: true });
  });

  it('handles tel: scheme', async () => {
    (Linking.canOpenURL as jest.Mock).mockResolvedValue(true);

    const result = await openLink(telUrl);

    expect(Linking.canOpenURL).toHaveBeenCalledWith(telUrl);
    expect(Linking.openURL).toHaveBeenCalledWith(telUrl);
    expect(result).toEqual({ success: true });
  });

  it('handles sms: scheme', async () => {
    (Linking.canOpenURL as jest.Mock).mockResolvedValue(true);

    const result = await openLink(smsUrl);

    expect(Linking.canOpenURL).toHaveBeenCalledWith(smsUrl);
    expect(Linking.openURL).toHaveBeenCalledWith(smsUrl);
    expect(result).toEqual({ success: true });
  });

  it('handles intent: scheme', async () => {
    (Linking.canOpenURL as jest.Mock).mockResolvedValue(true);

    const result = await openLink(intentUrl);

    expect(Linking.canOpenURL).toHaveBeenCalledWith(intentUrl);
    expect(Linking.openURL).toHaveBeenCalledWith(intentUrl);
    expect(result).toEqual({ success: true });
  });

  it('shows alert if URL is undefined', async () => {
    const result = await openLink(undefined as unknown as string);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Invalid URL',
      'The provided URL is not valid.',
    );
    expect(result).toEqual({ success: false });
  });

  it('shows alert if URL is empty string', async () => {
    const result = await openLink('');

    expect(Alert.alert).toHaveBeenCalledWith(
      'Invalid URL',
      'The provided URL is not valid.',
    );
    expect(result).toEqual({ success: false });
  });
});
