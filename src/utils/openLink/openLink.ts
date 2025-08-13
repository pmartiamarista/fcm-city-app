import { Alert, Linking } from 'react-native';

/**
 * Attempts to open any URL using the device's default handler.
 * Validates the URL format before attempting to open.
 *
 * @param url - The URL to open (must include a valid scheme)
 * @returns A Promise resolving to { success: boolean }
 */
export const openLink = async (url: string): Promise<{ success: boolean }> => {
  if (!url || typeof url !== 'string') {
    Alert.alert('Invalid URL', 'The provided URL is not valid.');
    return { success: false };
  }

  const hasProtocol =
    /^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//.test(url) ||
    /^geo:/.test(url) ||
    /^tel:/.test(url) ||
    /^sms:/.test(url) ||
    /^intent:/.test(url);

  if (!hasProtocol) {
    Alert.alert('Invalid URL', 'The provided URL is not valid.');
    return { success: false };
  }

  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
      return { success: true };
    } else {
      Alert.alert(
        'Unsupported Link',
        'This link cannot be opened on your device.',
      );
      return { success: false };
    }
  } catch {
    Alert.alert(
      'Error',
      'An unexpected error occurred while trying to open the link.',
    );
    return { success: false };
  }
};
