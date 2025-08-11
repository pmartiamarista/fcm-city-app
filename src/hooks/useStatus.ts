import { useMemo } from 'react';

import { getStatus, GetStatusParams } from '@/utils/getStatus/getStatus';

import { Statuses } from '../types/types';

/**
 * Custom hook to get application status based on request status and data.
 *
 * @param {GetStatusParams<T>} params - The request status and optional data.
 * @returns {Statuses} - The application statuses.
 */
export const useStatus = <T>({
  status,
  data,
}: GetStatusParams<T>): Statuses => {
  return useMemo(() => getStatus({ status, data }), [status, data]);
};
