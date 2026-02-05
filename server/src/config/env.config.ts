import dotenv from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.test';

dotenv.config({ path: envFile });

const requiredEnvVars = ['PORT', 'MONGODB_URI'];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
});

export const config = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI as string,
};
