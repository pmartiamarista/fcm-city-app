import { configureStore } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  useDispatch,
  // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  useSelector,
} from 'react-redux';

import { CITY } from './slices/cityActions';
import citySlice from './slices/citySlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: {
    [CITY]: citySlice,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({ serializableCheck: false });

    return middleware;
  },
});

export { store, useAppDispatch, useAppSelector };
