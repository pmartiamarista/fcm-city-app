import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { store } from '@/store';

import { RootStack } from '@/screens/App.navigator';
export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootStack />
      </Provider>
    </SafeAreaProvider>
  );
}
