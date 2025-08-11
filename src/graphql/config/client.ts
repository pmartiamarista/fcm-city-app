import { GraphQLClient } from 'graphql-request';

import { API_URL, AUTH_TOKEN } from '@/constants/parsedEnv';
import { getSdk } from '@/graphql/__generated__/graphql';

const client = new GraphQLClient(API_URL || '', {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN || ''}`,
  },
});

export const graphql = getSdk(client);
