# Testing Strategy & Implementation

## 🎯 Testing Philosophy

Our testing strategy follows the **Testing Pyramid** approach, emphasizing:

- **Unit Tests** - Fast, focused component and utility testing
- **Integration Tests** - Redux store and hook integration testing
- **E2E Tests** - Critical user journey testing (future implementation)

## 🧪 Testing Infrastructure

### Testing Stack

- **Jest** - Test runner and assertion library
- **React Native Testing Library** - Component testing utilities
- **Custom Mock System** - Professional-grade testing infrastructure
- **Coverage Reporting** - Comprehensive coverage tracking

### Jest Configuration

```javascript
// jest.config.cjs
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/__mocks__/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/__mocks__/**',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-reanimated)/)',
  ],
};
```

## 🎭 Mock System Architecture

### Design Principles

1. **Type Safety** - All mocks maintain TypeScript type safety
2. **Realistic Data** - Mock data represents real-world scenarios
3. **Consistent API** - Mock interfaces match real implementations
4. **Isolation** - Each test has independent mock state

### Mock System Structure

```
src/__mocks__/
├── index.ts                 # Central export hub
├── jest.setup.ts           # Jest configuration
├── README.md               # Mock system documentation
├── examples/               # Usage examples
│   └── mockUsageExample.test.tsx
└── utils/                  # Mock utilities
    ├── cityMocks.ts        # City and place data mocks
    ├── storeMocks.ts       # Redux store mocks
    ├── componentMocks.tsx  # Component mocks
    └── serviceMocks.ts     # External service mocks
```

### Mock Categories

#### 1. Data Mocks (`cityMocks.ts`)

```typescript
// Factory functions for creating test data
export const createMockCity = (overrides: Partial<City> = {}): City => ({
  id: '1',
  name: 'Paris',
  key: 'paris',
  nativeName: 'Paris',
  currency: 'EUR',
  language: 'French',
  ...overrides,
});

export const createMockCities = (
  count: number = 2,
  baseOverrides: Partial<City> = {},
): NonNullable<GetCitiesQuery['allCities']> => {
  const cities: NonNullable<GetCitiesQuery['allCities']> = [];

  for (let i = 0; i < count; i++) {
    const cityId = (i + 1).toString();
    cities.push(
      createMockCity({
        id: cityId,
        name: i === 0 ? 'Paris' : 'Tokyo',
        key: i === 0 ? 'paris' : 'tokyo',
        nativeName: i === 0 ? 'Paris' : '東京',
        currency: i === 0 ? 'EUR' : 'JPY',
        language: i === 0 ? 'French' : 'Japanese',
        ...baseOverrides,
      }),
    );
  }

  return cities;
};
```

#### 2. Store Mocks (`storeMocks.ts`)

```typescript
// Redux store testing utilities
export const createMockStore = () => {
  return configureStore({
    reducer: { city: citySlice },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export const mockAsyncThunks = {
  loadAllCities: {
    pending: (requestId: string, arg: unknown, _meta: unknown) => ({
      type: cityAsyncThunks.loadAllCities.pending.type,
      payload: undefined,
      meta: { arg, requestId },
    }),
    fulfilled: (payload: unknown, requestId: string, arg: unknown) => ({
      type: cityAsyncThunks.loadAllCities.fulfilled.type,
      payload,
      meta: { arg, requestId },
    }),
    rejected: (error: Error, requestId: string, arg: unknown) => ({
      type: cityAsyncThunks.loadAllCities.rejected.type,
      payload: error,
      meta: { arg, requestId },
      error: { message: error.message },
    }),
  },
};
```

#### 3. Component Mocks (`componentMocks.tsx`)

```typescript
// Mock implementations of React Native components
export const MockIconWrapper = ({
  icon,
  color: _color,
  size: _size,
  ...props
}: IconWrapperProps) => (
  <View testID={`${icon}-icon`} {...props}>
    <Text>{icon} Icon</Text>
  </View>
);

export const MockChip = ({ children, style, onPress: _onPress, ...props }: ChipProps) => (
  <View testID='chip' style={style as ViewStyle} {...props}>
    <Text>{children}</Text>
  </View>
);
```

#### 4. Service Mocks (`serviceMocks.ts`)

```typescript
// External service mocks
export const mockCityService = {
  fetchAllCities: jest.fn().mockResolvedValue(createMockCities()),
  getCity: jest.fn().mockResolvedValue(createMockCity()),
  getCityPlace: jest.fn().mockResolvedValue(createMockCityPlaceQuery()),
};

export const mockNetInfo = {
  fetch: jest.fn().mockResolvedValue({
    isConnected: true,
    type: 'wifi',
    isInternetReachable: true,
  }),
  addEventListener: jest.fn().mockReturnValue(() => {}),
};
```

## 📊 Coverage Strategy

### Coverage Goals

- **Components**: 100% ✅
- **Hooks**: 100% ✅
- **Store**: 100% ✅
- **Utilities**: 100% ✅
- **Overall**: 100% ✅

### Coverage Collection

```bash
# Run tests with coverage
yarn test --coverage --watchAll=false

# Generate coverage report
yarn test --coverage --coverageReporters=lcov --coverageReporters=text
```

### Coverage Exclusions

```javascript
// jest.config.cjs
collectCoverageFrom: [
  'src/**/*.{ts,tsx}',
  '!src/__mocks__/**', // Exclude mock files
  '!src/**/*.d.ts', // Exclude type definitions
  '!src/**/*.test.{ts,tsx}', // Exclude test files
  '!src/**/*.spec.{ts,tsx}', // Exclude spec files
];
```

## 🧩 Component Testing

### Testing Approach

1. **Props Testing** - Verify component behavior with different props
2. **User Interaction** - Test press events, accessibility, and state changes
3. **Edge Cases** - Handle error states and boundary conditions
4. **Accessibility** - Ensure proper accessibility attributes

### Component Test Example

```typescript
// src/components/chip/Chip.test.tsx
describe('Chip Component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<Chip>Test Chip</Chip>);
    const chip = getByTestId('chip');
    expect(chip).toBeTruthy();
  });

  it('renders with custom children', () => {
    const { getByText } = render(<Chip>Custom Content</Chip>);
    expect(getByText('Custom Content')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Chip onPress={onPress}>Pressable Chip</Chip>
    );

    fireEvent.press(getByTestId('chip'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <Chip style={customStyle}>Styled Chip</Chip>
    );

    const chip = getByTestId('chip');
    expect(chip.props.style).toContain(customStyle);
  });
});
```

## 🪝 Hook Testing

### Testing Strategy

1. **State Changes** - Verify hook state updates correctly
2. **Side Effects** - Test useEffect cleanup and dependencies
3. **Async Operations** - Handle network requests and error states
4. **Cleanup** - Ensure proper cleanup of subscriptions and timers

### Hook Test Example

```typescript
// src/hooks/useOfflineStatus.test.tsx
describe('useOfflineStatus Hook', () => {
  beforeEach(() => {
    resetServiceMocks();
  });

  it('returns initial state', async () => {
    const { result } = renderHook(() => useOfflineStatus());

    expect(result.current.isOffline).toBe(false);
    expect(result.current.isConnected).toBe(null);
    expect(result.current.connectionType).toBe(null);
  });

  it('handles network changes', async () => {
    const { result } = renderHook(() => useOfflineStatus());

    // Simulate network change
    act(() => {
      mockNetInfo.addEventListener.mock.calls[0][0]({
        isConnected: false,
        type: 'none',
      });
    });

    expect(result.current.isOffline).toBe(true);
    expect(result.current.isConnected).toBe(false);
    expect(result.current.connectionType).toBe('none');
  });

  it('cleans up subscriptions on unmount', () => {
    const unsubscribe = jest.fn();
    mockNetInfo.addEventListener.mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useOfflineStatus());
    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
```

## 🏪 Store Testing

### Testing Approach

1. **Action Dispatching** - Verify Redux actions are dispatched correctly
2. **State Transitions** - Test state changes for all action types
3. **Async Thunks** - Test API integration and error handling
4. **State Persistence** - Verify data persistence across app sessions

### Store Test Example

```typescript
// src/store/slices/city.actions.test.ts
describe('City Async Thunks', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
    resetServiceMocks();
  });

  describe('loadAllCities', () => {
    it('handles successful API response', async () => {
      const mockCities = createMockCities(2);
      mockCityService.fetchAllCities.mockResolvedValue(mockCities);

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

    it('handles API errors gracefully', async () => {
      const error = new Error('Network error');
      mockCityService.fetchAllCities.mockRejectedValue(error);

      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadAllCities.pending('', undefined, ''),
        );
      });

      await act(async () => {
        store.dispatch(
          cityAsyncThunks.loadAllCities.rejected(error, '', undefined),
        );
      });

      const state = store.getState();
      expect(state.city.allCities.status).toBe('failed');
      expect(state.city.allCities.error).toBe(error.message);
    });
  });
});
```

## 🔄 Integration Testing

### Testing Strategy

1. **Component + Hook Integration** - Test component behavior with hooks
2. **Store Integration** - Verify Redux state updates component behavior
3. **API Integration** - Test end-to-end data flow
4. **Error Handling** - Verify error states propagate correctly

### Integration Test Example

```typescript
// src/hooks/city/useAllCities.test.tsx
describe('useAllCities Hook Integration', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
    resetServiceMocks();
  });

  it('loads cities and updates state', async () => {
    const mockCities = createMockCities(2);
    mockCityService.fetchAllCities.mockResolvedValue(mockCities);

    const { result } = renderHook(() => useAllCities(), {
      wrapper: ({ children }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    // Initial state
    expect(result.current.allCities.status).toBe('idle');
    expect(result.current.allCities.list).toEqual([]);

    // Load cities
    await act(async () => {
      await result.current.loadAllCities();
    });

    // Verify state updates
    expect(result.current.allCities.status).toBe('succeeded');
    expect(result.current.allCities.list).toEqual(mockCities);
  });
});
```

## 🎯 Testing Best Practices

### Test Organization

1. **Descriptive Names** - Clear, descriptive test names
2. **Arrange-Act-Assert** - Consistent test structure
3. **Setup/Teardown** - Proper test isolation
4. **Grouping** - Logical test grouping with describe blocks

### Mock Management

1. **Reset Mocks** - Reset mock state between tests
2. **Mock Isolation** - Each test has independent mock state
3. **Realistic Data** - Mock data represents real scenarios
4. **Type Safety** - Maintain TypeScript type safety

### Performance Considerations

1. **Fast Execution** - Tests should run quickly
2. **Minimal Dependencies** - Avoid unnecessary test dependencies
3. **Efficient Mocks** - Lightweight mock implementations
4. **Parallel Execution** - Tests can run in parallel

## 📈 Coverage Monitoring

### Continuous Monitoring

- **GitHub Actions** - Automated coverage collection
- **Codecov Integration** - Coverage reporting and tracking
- **Coverage Thresholds** - Enforce minimum coverage levels
- **Trend Analysis** - Monitor coverage over time

### Coverage Reports

```bash
# Generate HTML coverage report
yarn test --coverage --coverageReporters=html

# Generate LCOV report for CI
yarn test --coverage --coverageReporters=lcov
```

### Coverage Thresholds

```javascript
// jest.config.cjs
coverageThreshold: {
  global: {
    branches: 80,    // Minimum branch coverage
    functions: 80,   // Minimum function coverage
    lines: 80,       // Minimum line coverage
    statements: 80   // Minimum statement coverage
  }
}
```

## 🚀 Future Testing Enhancements

### Planned Improvements

1. **E2E Testing** - Critical user journey testing
2. **Visual Regression Testing** - UI consistency testing
3. **Performance Testing** - Animation and rendering performance
4. **Accessibility Testing** - Automated accessibility validation

### Testing Tools

1. **Detox** - E2E testing for React Native
2. **Storybook** - Component development and testing
3. **Percy** - Visual regression testing
4. **Lighthouse CI** - Performance and accessibility testing

---

This comprehensive testing strategy ensures code quality, maintainability, and reliability while providing a solid foundation for future development and testing enhancements.
