import { SignOptions } from 'jsonwebtoken';

const issuer = 'auth-issuer';

export const APP_JWT_CONFIG = {
  SECRET_KEY: 'my-secret',
  SIGN_OPTIONS: {
    algorithm: 'HS256',
    issuer,
    keyid: 'jwt-key-id',
    expiresIn: '60m',
    audience: 'http://localhost:3001',
  } as SignOptions,
  VERIFY_OPTIONS: {
    audience: 'http://localhost:3001',
    issuer,
    publicKey: 'jwt-key-id',
  },
};

const encodeBase64 = (data) => {
  return Buffer.from(data).toString('base64');
};

export const KEYS = {
  keys: [
    {
      kid: APP_JWT_CONFIG.SIGN_OPTIONS.keyid,
      kty: 'oct',
      k: encodeBase64(APP_JWT_CONFIG.SECRET_KEY),
      alg: APP_JWT_CONFIG.SIGN_OPTIONS.algorithm,
    },
  ],
};
