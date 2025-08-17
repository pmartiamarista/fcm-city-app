import {
  createMockCities,
  createMockCity,
  createMockCityPlaceQuery,
} from './cityMocks';

/**
 * Mock city service for testing
 */
export const mockCityService = {
  fetchAllCities: jest.fn().mockResolvedValue(createMockCities()),
  getCity: jest.fn().mockResolvedValue(createMockCity()),
  getCityPlace: jest.fn().mockResolvedValue(createMockCityPlaceQuery()),
};

/**
 * Mock NetInfo service for testing
 */
export const mockNetInfo = {
  fetch: jest.fn().mockResolvedValue({
    isConnected: true,
    type: 'wifi',
    isInternetReachable: true,
    isWifi: true,
    isCellular: false,
    isEthernet: false,
    isVpn: false,
    isWifiEnabled: true,
    isLocationEnabled: true,
    isAirplaneModeEnabled: false,
    carrier: null,
    cellularGeneration: null,
    cellularStrength: null,
    ssid: 'TestWiFi',
    bssid: '00:11:22:33:44:55',
    frequency: 2412,
    subnet: '192.168.1.0',
    ipAddress: '192.168.1.100',
    gateway: '192.168.1.1',
    dns: ['8.8.8.8', '8.8.4.4'],
  }),
  addEventListener: jest.fn().mockReturnValue(() => {}),
};

/**
 * Mock navigation service for testing
 */
export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  canGoBack: jest.fn().mockReturnValue(true),
  isFocused: jest.fn().mockReturnValue(true),
  addListener: jest.fn().mockReturnValue(() => {}),
  removeListener: jest.fn().mockReturnValue(() => {}),
};

/**
 * Mock route service for testing
 */
export const mockRoute = {
  key: 'test-route',
  name: 'TestScreen',
  params: {},
  path: undefined,
};

/**
 * Mock Linking service for testing
 */
export const mockLinking = {
  openURL: jest.fn().mockResolvedValue(true),
  canOpenURL: jest.fn().mockResolvedValue(true),
  getInitialURL: jest.fn().mockResolvedValue(null),
  addEventListener: jest.fn().mockReturnValue(() => {}),
  removeEventListener: jest.fn().mockReturnValue(() => {}),
};

/**
 * Mock AsyncStorage service for testing
 */
export const mockAsyncStorage = {
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn().mockResolvedValue(undefined),
  removeItem: jest.fn().mockResolvedValue(undefined),
  clear: jest.fn().mockResolvedValue(undefined),
  getAllKeys: jest.fn().mockResolvedValue([]),
  multiGet: jest.fn().mockResolvedValue([]),
  multiSet: jest.fn().mockResolvedValue(undefined),
  multiRemove: jest.fn().mockResolvedValue(undefined),
};

/**
 * Mock Permissions service for testing
 */
export const mockPermissions = {
  request: jest.fn().mockResolvedValue('granted'),
  check: jest.fn().mockResolvedValue('granted'),
  query: jest.fn().mockResolvedValue({ status: 'granted' }),
};

/**
 * Mock ImagePicker service for testing
 */
export const mockImagePicker = {
  launchImageLibrary: jest.fn().mockResolvedValue({
    didCancel: false,
    errorCode: undefined,
    errorMessage: undefined,
    assets: [
      {
        uri: 'file://test-image.jpg',
        width: 1920,
        height: 1080,
        type: 'image/jpeg',
        fileName: 'test-image.jpg',
        fileSize: 1024000,
      },
    ],
  }),
  launchCamera: jest.fn().mockResolvedValue({
    didCancel: false,
    errorCode: undefined,
    errorMessage: undefined,
    assets: [
      {
        uri: 'file://test-photo.jpg',
        width: 1920,
        height: 1080,
        type: 'image/jpeg',
        fileName: 'test-photo.jpg',
        fileSize: 1024000,
      },
    ],
  }),
};

/**
 * Mock Geolocation service for testing
 */
export const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementation((success) => {
    success({
      coords: {
        latitude: 48.8584,
        longitude: 2.2945,
        altitude: 35,
        accuracy: 5,
        altitudeAccuracy: 10,
        heading: 0,
        speed: 0,
      },
      timestamp: Date.now(),
    });
  }),
  watchPosition: jest.fn().mockReturnValue(123),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
  requestAuthorization: jest.fn().mockResolvedValue('granted'),
  setRNConfiguration: jest.fn(),
};

/**
 * Mock DeviceInfo service for testing
 */
export const mockDeviceInfo = {
  getBrand: jest.fn().mockResolvedValue('Apple'),
  getModel: jest.fn().mockResolvedValue('iPhone 14'),
  getSystemName: jest.fn().mockResolvedValue('iOS'),
  getSystemVersion: jest.fn().mockResolvedValue('16.0'),
  getVersion: jest.fn().mockResolvedValue('1.0.0'),
  getBuildNumber: jest.fn().mockResolvedValue('1'),
  getBundleId: jest.fn().mockResolvedValue('com.example.app'),
  getUniqueId: jest.fn().mockResolvedValue('unique-device-id'),
  getDeviceId: jest.fn().mockResolvedValue('device-id'),
  getDeviceName: jest.fn().mockResolvedValue('iPhone'),
  getUserAgent: jest.fn().mockResolvedValue('React Native App'),
  getDeviceType: jest.fn().mockResolvedValue('Handset'),
  isTablet: jest.fn().mockResolvedValue(false),
  isLocationEnabled: jest.fn().mockResolvedValue(true),
  isCameraAvailable: jest.fn().mockResolvedValue(true),
  isMicrophoneAvailable: jest.fn().mockResolvedValue(true),
  isBiometricSupported: jest.fn().mockResolvedValue(true),
  getAvailableLocationProviders: jest.fn().mockResolvedValue({
    gps: true,
    network: true,
    passive: true,
  }),
};

/**
 * Helper to reset all service mocks
 */
export const resetServiceMocks = () => {
  jest.clearAllMocks();

  // Reset specific service mocks to default values
  mockCityService.fetchAllCities.mockResolvedValue(createMockCities());
  mockCityService.getCity.mockResolvedValue(createMockCity());
  mockCityService.getCityPlace.mockResolvedValue(createMockCityPlaceQuery());

  mockNetInfo.fetch.mockResolvedValue({
    isConnected: true,
    type: 'wifi',
    isInternetReachable: true,
  });

  mockNetInfo.addEventListener.mockReturnValue(() => {});

  mockNavigation.navigate.mockClear();
  mockNavigation.goBack.mockClear();

  mockLinking.openURL.mockResolvedValue(true);
  mockLinking.canOpenURL.mockResolvedValue(true);

  mockAsyncStorage.getItem.mockResolvedValue(null);
  mockAsyncStorage.setItem.mockResolvedValue(undefined);

  mockPermissions.request.mockResolvedValue('granted');
  mockPermissions.check.mockResolvedValue('granted');

  mockGeolocation.getCurrentPosition.mockClear();
  mockGeolocation.watchPosition.mockReturnValue(123);

  mockDeviceInfo.getBrand.mockResolvedValue('Apple');
  mockDeviceInfo.getModel.mockResolvedValue('iPhone 14');
};
