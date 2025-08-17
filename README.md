# FCM City App - Mobile Technical Challenge

A React Native Expo application demonstrating advanced mobile development techniques including advanced animations, offline support, comprehensive testing, and CI/CD automation.

## 🚀 Features

### Core Functionality

- **City & Place Management** - Browse cities and their associated places
- **GraphQL Integration** - Modern API consumption with GraphQL
- **GraphQL Codegen** - Automated TypeScript types from GraphQL schema
- **Redux Toolkit** - State management with async thunks
- **TypeScript** - Full type safety throughout the application

### Advanced Animations 🎨

- **React Native Reanimated 3** - High-performance animations
- **Skeleton Loading States** - Smooth loading animations for better UX
- **Spring & Timing Animations** - Customizable animation curves
- **Hardware Acceleration** - Optimized for 60fps performance

### Offline Support 📱

- **Network Status Detection** - Real-time connectivity monitoring
- **Offline Banner** - User-friendly offline state indication
- **Graceful Degradation** - App remains functional when offline
- **NetInfo Integration** - Native network status detection

### Testing Excellence 🧪

- **100% Component Coverage** - Comprehensive test coverage
- **Professional Mock System** - Type-safe testing infrastructure
- **Redux Testing** - Store and async thunk testing
- **React Native Testing Library** - Modern testing practices

### CI/CD Pipeline 🔄

- **GitHub Actions** - Automated quality checks
- **Node.js 22** - Latest LTS version
- **Code Quality Gates** - Prettier, ESLint, TypeScript
- **Test Automation** - Automated test execution
- **Coverage Reporting** - Code coverage tracking

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Animations**: React Native Reanimated 3
- **API**: GraphQL with Apollo Client
- **GraphQL Tools**: GraphQL Code Generator for type safety
- **Testing**: Jest + React Native Testing Library
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint + Prettier + TypeScript

## 📱 Screenshots

_[Screenshots would be added here]_

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- Yarn package manager
- Expo CLI
- iOS Simulator / Android Emulator

### Development Server

The project connects to a deployed GraphQL development server. You'll need:

- Access to the development server URL
- Valid authentication token
- Network connectivity to the server

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fcm-city-app

# Install dependencies
yarn install

# Start the development server
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

### Development Commands

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test --coverage

# Code quality checks
yarn dev:check

# Type checking only
yarn typecheck

# Linting and auto-fix
yarn lint --fix

# Code formatting
yarn prettier --write .

# Generate GraphQL types
yarn gen
```

### Available Scripts

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "typecheck": "tsc --noEmit --incremental false",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "prettier": "prettier --write .",
    "dev:check": "prettier --w . && yarn typecheck && yarn lint --fix",
    "gen": "graphql-codegen --config codegen.ts"
  }
}
```

## 🏗️ Architecture

### GraphQL Codegen Integration

The project uses **GraphQL Code Generator** to automatically generate TypeScript types from GraphQL schema, ensuring type safety and developer productivity.

#### Codegen Configuration

The project uses GraphQL Code Generator configured in `codegen.ts` to:

- Connect to the deployed GraphQL server using `API_URL` and `AUTH_TOKEN` environment variables
- Automatically generate TypeScript types from the GraphQL schema
- Create type-safe hooks for all GraphQL operations
- Output generated types to `src/graphql/__generated__/graphql.ts`

#### Development Server

For this challenge, a development GraphQL server has been deployed with a database containing city and place data. The server is secured with an `AUTH_TOKEN` for authentication (Note: This is a simplified approach for the challenge - production environments should use proper authentication systems).

#### Benefits for Future Developers

- **Type Safety**: Automatic TypeScript types for all GraphQL operations
- **IntelliSense**: Full autocomplete and type checking in IDEs
- **API Consistency**: Types automatically stay in sync with GraphQL schema
- **Development Speed**: No manual type definitions needed
- **Error Prevention**: Compile-time errors for GraphQL mismatches

#### Usage

```bash
# Generate types from GraphQL schema
yarn gen

# Types are automatically generated in src/graphql/__generated__/graphql.ts
# Import and use in your components:
import { GetCitiesQuery, City } from '@/graphql/__generated__/graphql';
```

#### GraphQL File Structure

```
src/graphql/
├── __generated__/          # Auto-generated TypeScript types (DO NOT EDIT)
│   └── graphql.ts         # Main types file
├── config/                 # GraphQL client configuration
│   └── client.ts          # Apollo Client setup
├── getCities.graphql       # Cities query
├── getCity.graphql         # Single city query
└── getCityPlace.graphql    # City places query
```

**Important**: Never edit files in `__generated__/` folder - they are automatically generated and will be overwritten.

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── design-system/  # Design system tokens
│   ├── skeleton/       # Animated loading states
│   └── list/          # List components
├── hooks/              # Custom React hooks
├── store/              # Redux store and slices
├── graphql/            # GraphQL queries and client
│   ├── __generated__/  # Auto-generated TypeScript types
│   └── config/         # GraphQL client configuration
├── layout/             # Layout components
├── screens/            # Screen components
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### State Management

- **Redux Toolkit** for global state
- **Async Thunks** for API operations
- **Normalized State** for efficient data access
- **Type-safe Actions** with TypeScript

### Animation Architecture

- **Reanimated 3** for high-performance animations
- **Shared Values** for animation state management
- **Spring & Timing** for natural motion
- **Skeleton Components** for loading states

## 🎨 Advanced Animations

### Implementation Details

The app uses **React Native Reanimated 3** for smooth, 60fps animations:

```typescript
// Example: Skeleton loading animation
const opacity = useSharedValue(0.3);

useEffect(() => {
  opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
}, []);

const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
}));
```

### Animation Features

- **Smooth Loading States** - Pulsing skeleton animations
- **Performance Optimized** - Hardware acceleration enabled
- **Customizable Curves** - Spring and timing animations
- **Memory Efficient** - Proper cleanup and optimization

## 📱 Offline Support

### Network Detection

- **Real-time Monitoring** - Continuous network status updates
- **Native Integration** - Uses `@react-native-community/netinfo`
- **User Feedback** - Clear offline state indication

### Implementation

```typescript
export const useOfflineStatus = (): OfflineStatus => {
  const [offlineStatus, setOfflineStatus] = useState<OfflineStatus>({
    isOffline: false,
    isConnected: null,
    connectionType: null,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setOfflineStatus({
        isOffline: !state.isConnected,
        isConnected: state.isConnected,
        connectionType: state.type,
      });
    });

    return () => unsubscribe();
  }, []);

  return offlineStatus;
};
```

## 🧪 Testing Strategy

### Coverage Goals

- **100% Component Coverage** ✅
- **100% Hook Coverage** ✅
- **100% Store Coverage** ✅
- **100% Utility Coverage** ✅

### Testing Infrastructure

- **Professional Mock System** - Type-safe mock factories
- **Component Testing** - React Native Testing Library
- **Redux Testing** - Store and action testing
- **Hook Testing** - Custom hook testing utilities

### Mock System Architecture

```
src/__mocks__/
├── utils/
│   ├── cityMocks.ts      # City and place data mocks
│   ├── storeMocks.ts     # Redux store mocks
│   ├── componentMocks.tsx # Component mocks
│   └── serviceMocks.ts   # External service mocks
├── examples/              # Usage examples
├── jest.setup.ts         # Jest configuration
└── README.md             # Mock system documentation
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### Quality Check Workflow (`ci.yml`)

- **Triggers**: Push to main/dev, Pull Requests
- **Node.js**: Version 22
- **Quality Gates**:
  - Prettier formatting
  - TypeScript compilation
  - ESLint linting
  - Test execution with coverage
- **Coverage Upload** to Codecov

#### Deployment Workflow (`deploy.yml`)

- **Triggers**: Push to main, Manual dispatch
- **Node.js**: Version 22
- **Expo Integration**:
  - Android builds
  - iOS builds
  - Automated deployment

### Quality Gates

- **Code Formatting** - Prettier enforced
- **Type Safety** - TypeScript strict mode
- **Code Quality** - ESLint rules enforced
- **Test Coverage** - Minimum coverage thresholds
- **Build Success** - All platforms must build

## 📊 Performance Metrics

### Animation Performance

- **Target FPS**: 60fps
- **Memory Usage**: Optimized for mobile devices
- **Battery Impact**: Minimal through hardware acceleration

### Bundle Size

- **Optimized Dependencies** - Tree-shaking enabled
- **Code Splitting** - Lazy loading where appropriate
- **Asset Optimization** - Compressed images and fonts

## 🔧 Configuration

### Environment Variables

```bash
# API Configuration
API_URL=https://your-deployed-server.com/graphql  # Development server URL
AUTH_TOKEN=your_auth_token_here                  # Authentication token for development server

# Build Configuration
EXPO_PUBLIC_APP_NAME=FCM City App
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### Jest Configuration

```javascript
// jest.config.cjs
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/__mocks__/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/__mocks__/**',
    '!src/**/*.d.ts',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/'],
};
```

## 🚀 Deployment

### Build Commands

```bash
# Build for Android
expo build:android --non-interactive

# Build for iOS
expo build:ios --non-interactive

# Build for web
expo build:web
```

### Distribution

- **Expo Application Services** for OTA updates
- **App Store Connect** for iOS distribution
- **Google Play Console** for Android distribution

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch
3. **Update GraphQL Schema** (if needed)
4. **Generate Types** - Run `yarn gen` to update TypeScript types
5. **Implement** your changes with full type safety
6. **Test** thoroughly
7. **Submit** a pull request

### GraphQL Development

When working with GraphQL operations:

1. **Add/Modify Queries**: Edit `.graphql` files in `src/graphql/`
2. **Generate Types**: Run `yarn gen` to update TypeScript types
3. **Use Generated Types**: Import from `@/graphql/__generated__/graphql`
4. **Type Safety**: Enjoy full IntelliSense and compile-time error checking

Example:

```typescript
// After running 'yarn gen', you can use generated types:
import { useGetCitiesQuery, City } from '@/graphql/__generated__/graphql';

const { data, loading, error } = useGetCitiesQuery();
const cities: City[] = data?.allCities || [];
```

### Code Standards

- **TypeScript** - Strict mode enabled
- **ESLint** - Code quality rules
- **Prettier** - Consistent formatting
- **Tests** - New features require tests

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Native** team for the amazing framework
- **Expo** team for the development platform
- **Reanimated** team for the animation library
- **Redux Toolkit** team for state management

---

**Built for the FCM Mobile Technical Challenge**
