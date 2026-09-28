import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url('VITE_API_URL must be a valid URL'),
  APP_NAME: z.string().min(1, 'VITE_APP_NAME is required'),
});

const createEnv = () => {
  const env = {
    API_URL: import.meta.env.VITE_API_URL,
    APP_NAME: import.meta.env.VITE_APP_NAME,
  };

  const parsed = envSchema.safeParse(env);

  if (!parsed.success) {
    console.error(
      'Invalid environment variables',
      parsed.error.flatten().fieldErrors,
    );
    throw new Error('Invalid environment variables configuration');
  }

  return parsed.data;
};

export const env = createEnv();
