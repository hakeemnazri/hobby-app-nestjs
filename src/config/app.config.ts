import { registerAs } from '@nestjs/config';

const appConfig = registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'production',
  port: parseInt(process.env.PORT || '3000', 10),
}));

export type AppConfigType = ReturnType<typeof appConfig>;

export default appConfig;
