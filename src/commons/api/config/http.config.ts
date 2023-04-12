import { registerAs } from '@nestjs/config';

export type HttpConfig = {
  host: string;
  port: number;
};

export const httpConfig = registerAs<HttpConfig>('http', () => ({
  host: process.env.HTTP_HOST,
  port: parseInt(process.env.HTTP_PORT),
}));
