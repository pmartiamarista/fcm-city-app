import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '@/screens/App.navigator';

export const useAppRouting = <R extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, R>>();
};
