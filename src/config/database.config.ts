import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  user: process.env.POSTGRES_USER || 'localhost',
  password: process.env.POSTGRES_PASSWORD || 'topsecret',
  port: parseInt(process.env.POSTGRES_PORT || '5435'),
  database: process.env.POSTGRES_DB || 'postgres',
}));
