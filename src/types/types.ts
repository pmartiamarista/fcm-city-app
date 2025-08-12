import { z } from 'zod';

import { ItemGeneric, ListGeneric } from './generics';

export const requestStatusEnumSchema = z.enum([
  'idle',
  'loading',
  'succeeded',
  'failed',
]);
export type RequestStatusType = z.infer<typeof requestStatusEnumSchema>;

export const requestStatusSchema = z.object({
  status: requestStatusEnumSchema,
});

export type RequestStatus = z.infer<typeof requestStatusSchema>;

export const statusesSchema = z.object({
  isLoading: z.boolean(),
  hasError: z.boolean(),
  isLoaded: z.boolean(),
  isEmpty: z.boolean(),
  isIdle: z.boolean(),
});

export type Statuses = z.infer<typeof statusesSchema>;

export type ListBaseProps<T> = RequestStatus & ListGeneric<T>;
export type ItemBaseProps<T> = RequestStatus & ItemGeneric<T>;
