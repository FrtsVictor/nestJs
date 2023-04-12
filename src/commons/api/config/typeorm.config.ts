import { registerAs } from '@nestjs/config';

export type DataBaseConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
};

export const dataBaseConfig = registerAs<DataBaseConfig>('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
}));
