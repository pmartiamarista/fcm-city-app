import Constants from 'expo-constants';
import { z } from 'zod';

const extraEnvSchema = z.object({
  API_URL: z.string().nonempty('API_URL is required'),
  AUTH_TOKEN: z.string().nonempty('AUTH_TOKEN is required'),
});

const EXTRA_ENV_VARIABLES = Constants.expoConfig?.extra || {};

const parsedEnv = extraEnvSchema.safeParse(EXTRA_ENV_VARIABLES);

if (!parsedEnv.success) {
  throw new Error('Missing or invalid environment variables');
}

export const { API_URL, AUTH_TOKEN } = parsedEnv.data;
