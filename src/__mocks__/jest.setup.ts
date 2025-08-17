// Jest setup file for automatic mock configuration
import {
  mockCityService,
  mockLinking,
  mockNavigation,
  mockNetInfo,
} from './utils/serviceMocks';

// Mock external modules automatically
jest.mock('@/api/cityService', () => mockCityService);
jest.mock('@react-native-community/netinfo', () => mockNetInfo);
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
  useRoute: () => ({ params: { cityId: '1' } }),
}));
jest.mock('react-native/Libraries/Linking/Linking', () => mockLinking);

// Mock React Native components that might cause issues in tests
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock SVG components - only when needed
// jest.mock('react-native-svg', () => ({
//   Svg: 'Svg',
//   Path: 'Path',
//   Circle: 'Circle',
//   Rect: 'Rect',
//   G: 'G',
// }));

// Global test utilities
global.console = {
  ...console,
  // Uncomment to ignore console.log in tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};
