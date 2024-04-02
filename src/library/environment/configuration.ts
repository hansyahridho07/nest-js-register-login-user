import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    env: process.env.ENV,
    port: parseInt(process.env.PORT, 10) || 8000,
    smtp_host: process.env.SMTP_HOST,
    smtp_user: process.env.SMTP_USER,
    smtp_password: process.env.SMTP_PASSWORD,
    base_url: process.env.BASE_URL,
    secret_jwt: process.env.SECRET_JWT,
    expired_in: process.env.EXPIRED_IN,
  };
});
