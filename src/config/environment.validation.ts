import * as joi from 'joi';

export default joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: joi.number().default(3000),
  TRY_ME: joi.string().required(),
  POSTGRES_USER: joi.string().required(),
  POSTGRES_PASSWORD: joi.string().required(),
  POSTGRES_PORT: joi.number().required(),
  POSTGRES_DB: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_TOKEN_AUDIENCE: joi.string().required(),
  JWT_ISSUER: joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: joi.number().required(),
  JWT_REFRESH_TOKEN_TTL: joi.number().required(),
});
