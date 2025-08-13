import { CodegenConfig } from '@graphql-codegen/cli';

import { API_URL, AUTH_TOKEN } from '@/constants/parsedEnv';

const config: CodegenConfig = {
  schema: {
    [API_URL]: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    },
  },
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/graphql/__generated__/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        scalars: {
          JSON: '@/types/placeMetadata#PlaceMetadata',
        },
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
