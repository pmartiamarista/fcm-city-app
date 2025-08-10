import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStack } from '@/screens/App.navigator';
export default function App() {
  return (
    <SafeAreaProvider>
      <RootStack />
    </SafeAreaProvider>
  );
}
