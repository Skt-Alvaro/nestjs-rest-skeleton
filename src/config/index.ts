import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    jwt: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiration: process.env.JWT_ACCESS_EXPIRATION,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    },
    frontend: {
      host: process.env.FRONTEND_HOST,
      url: process.env.FRONTEND_URL,
    },
  };
});
