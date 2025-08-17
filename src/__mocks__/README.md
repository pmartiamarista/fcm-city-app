# 🎭 Mock System for Testing

This directory contains a comprehensive mocking system for testing React Native components, Redux store, and external services.

## 📁 Structure

```
src/__mocks__/
├── utils/
│   ├── cityMocks.ts      # City and place data mocks
│   ├── storeMocks.ts     # Redux store and action mocks
│   ├── componentMocks.ts # React Native component mocks
│   └── serviceMocks.ts   # External service mocks
├── examples/
│   └── mockUsageExample.test.tsx # Usage examples
├── jest.setup.ts          # Jest configuration
├── index.ts               # Main exports
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Import Mocks

```typescript
import {
  createMockCity,
  createMockStore,
  MockIconButton,
  mockCityService,
} from '@/__mocks__';
```

### 2. Use in Tests

```typescript
describe('MyComponent', () => {
  it('should render with mock data', () => {
    const mockCity = createMockCity({ name: 'Tokyo' });
    const { getByText } = render(<MyComponent city={mockCity} />);

    expect(getByText('Tokyo')).toBeTruthy();
  });
});
```

## 🎯 Available Mocks

### City Mocks

```typescript
// Create a single city
const city = createMockCity();
const tokyo = createMockCity({ name: 'Tokyo', currency: 'JPY' });

// Create multiple cities
const cities = createMockCities(5);
const customCities = createMockCities(3, { currency: 'USD' });

// Predefined cities
import { mockCities } from '@/__mocks__';
const paris = mockCities.paris;
const tokyo = mockCities.tokyo;
```

### Store Mocks

```typescript
// Create test store
const store = createMockStore();

// Mock async thunk actions
import { mockAsyncThunks } from '@/__mocks__';

store.dispatch(
  mockAsyncThunks.loadAllCities.pending('request-1', undefined, 'meta'),
);

store.dispatch(
  mockAsyncThunks.loadAllCities.fulfilled(
    { allCities: mockCities },
    'request-1',
    undefined,
  ),
);

// Helper functions
const cityState = getCityState(store);
const allCitiesState = getAllCitiesState(store);
const selectedCity = getSelectedCityState(store, 'city-1');
```

### Component Mocks

```typescript
// Mock components for testing
import {
  MockIconButton,
  MockChip,
  MockCityListItem,
  MockSkeleton,
} from '@/__mocks__';

// Use in tests
const { getByTestId } = render(
  <MockIconButton icon="city" onPress={mockOnPress} />
);

expect(getByTestId('icon-button')).toBeTruthy();
```

### Service Mocks

```typescript
// Mock external services
import { mockCityService, mockNetInfo, mockNavigation } from '@/__mocks__';

// Configure mock responses
mockCityService.fetchAllCities.mockResolvedValue(mockCities);
mockNetInfo.fetch.mockResolvedValue({ isConnected: false });

// Reset all mocks
resetServiceMocks();
```

## 🔧 Configuration

### Jest Setup

The mocks are automatically configured via `jest.setup.ts`. This file:

- Mocks external modules
- Sets up global test utilities
- Configures React Native component mocks

### Jest Config

```javascript
// jest.config.cjs
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/__mocks__/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/__mocks__/**/*', // Exclude mocks from coverage
  ],
};
```

## 📝 Best Practices

### 1. Use Interface-Based Mocks

```typescript
// ✅ Good: Use real interfaces
const mockCity: City = createMockCity();

// ❌ Bad: Arbitrary objects
const mockCity = { id: '1', name: 'Paris' };
```

### 2. Reset Mocks Between Tests

```typescript
beforeEach(() => {
  resetServiceMocks();
  jest.clearAllMocks();
});
```

### 3. Use Mock Factories

```typescript
// ✅ Good: Reusable factory
const createTestCity = (overrides: Partial<City> = {}) =>
  createMockCity({ currency: 'USD', ...overrides });

// ❌ Bad: Hardcoded values
const testCity = { id: '1', name: 'Test', currency: 'USD' };
```

### 4. Test Edge Cases

```typescript
it('should handle empty city list', () => {
  const emptyCities = createMockCities(0);
  // Test with empty data
});

it('should handle city with missing optional fields', () => {
  const minimalCity = createMockCity({
    currency: undefined,
    language: undefined,
  });
  // Test with minimal data
});
```

## 🧪 Testing Patterns

### Redux Store Testing

```typescript
describe('City Slice', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  it('should handle async thunk lifecycle', async () => {
    const mockCities = createMockCities(2);

    // Test pending state
    store.dispatch(
      mockAsyncThunks.loadAllCities.pending('request-1', undefined, 'meta'),
    );
    expect(getAllCitiesState(store).status).toBe('loading');

    // Test fulfilled state
    store.dispatch(
      mockAsyncThunks.loadAllCities.fulfilled(
        { allCities: mockCities },
        'request-1',
        undefined,
      ),
    );
    expect(getAllCitiesState(store).status).toBe('succeeded');
  });
});
```

### Component Testing

```typescript
describe('CityListItem', () => {
  it('should render city information', () => {
    const mockCity = createMockCity({
      name: 'Paris',
      nativeName: 'Paris',
      currency: 'EUR'
    });

    const { getByText } = render(
      <MockCityListItem city={mockCity} onPress={jest.fn()} />
    );

    expect(getByText('Paris')).toBeTruthy();
    expect(getByText('Paris')).toBeTruthy(); // nativeName
  });
});
```

### Service Testing

```typescript
describe('City Service', () => {
  beforeEach(() => {
    resetServiceMocks();
  });

  it('should fetch cities successfully', async () => {
    const mockCities = createMockCities(3);
    mockCityService.fetchAllCities.mockResolvedValue(mockCities);

    const result = await mockCityService.fetchAllCities();

    expect(result).toEqual(mockCities);
    expect(mockCityService.fetchAllCities).toHaveBeenCalledTimes(1);
  });

  it('should handle service errors', async () => {
    const error = new Error('Network error');
    mockCityService.fetchAllCities.mockRejectedValue(error);

    await expect(mockCityService.fetchAllCities()).rejects.toThrow(
      'Network error',
    );
  });
});
```

## 🔍 Debugging

### Common Issues

1. **Mock not working**: Ensure the mock is imported and configured in `jest.setup.ts`
2. **Type errors**: Check that mock objects match the expected interfaces
3. **Component not rendering**: Verify that mock components are properly exported

### Debug Commands

```bash
# Run tests with verbose output
yarn test --verbose

# Run specific test file
yarn test mockUsageExample.test.tsx

# Run tests with coverage
yarn test --coverage
```

## 📚 Examples

See `examples/mockUsageExample.test.tsx` for comprehensive usage examples covering:

- City data mocking
- Redux store testing
- Component rendering
- Service mocking
- Integration testing

## 🤝 Contributing

When adding new mocks:

1. Follow the existing pattern in the appropriate utility file
2. Add proper TypeScript types
3. Include JSDoc comments
4. Add tests in the examples file
5. Update this README

## 📖 Related Documentation

- [Jest Testing Framework](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Redux Toolkit Testing](https://redux-toolkit.js.org/usage/writing-tests)
