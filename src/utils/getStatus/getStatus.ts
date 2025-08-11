import { RequestStatus, Statuses } from '@/types/types';

export type GetStatusParams<T> = RequestStatus & {
  data?: T | T[] | Set<T> | Map<unknown, T> | null;
};

/**
 * Returns UI status flags based on request status and data shape.
 */
export const getStatus = <T>({
  status,
  data,
}: GetStatusParams<T>): Statuses => {
  const isArray = Array.isArray(data);
  const isEmptyArray = isArray && (data as T[]).length === 0;

  const isSet = data instanceof Set;
  const isEmptySet = isSet && (data as Set<T>).size === 0;

  const isMap = data instanceof Map;
  const isEmptyMap = isMap && (data as Map<unknown, T>).size === 0;

  const isEmptySingleItem =
    (!isArray && !isSet && !isMap && data === undefined) || data === null;

  const isEmptyObject =
    !isArray &&
    !isSet &&
    !isMap &&
    data !== undefined &&
    data !== null &&
    typeof data === 'object' &&
    Object.keys(data).length === 0;

  const isEmpty =
    isEmptyArray ||
    isEmptySingleItem ||
    isEmptyObject ||
    isEmptySet ||
    isEmptyMap;

  return {
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    hasError: status === 'failed',
    isLoaded: status === 'succeeded',
    isEmpty: status === 'succeeded' && isEmpty,
  };
};
