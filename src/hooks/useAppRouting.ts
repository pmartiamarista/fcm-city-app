import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';

const useAppRouting = <T extends ParamListBase, R extends keyof T>() => {
  return useRoute<RouteProp<T, R>>();
};

export default useAppRouting;
