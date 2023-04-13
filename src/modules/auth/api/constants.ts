import { SignOptions } from 'jsonwebtoken';

const issuer = 'auth-issuer';
const kid = 'jwt-key-id';

export const APP_JWT_CONFIG = {
  SECRET_KEY: 'my-secret',
  SIGN_OPTIONS: {
    algorithm: 'HS256',
    issuer,
    keyid: kid,
    expiresIn: '60m',
  } as SignOptions,
  VERIFY_OPTIONS: {
    issuer,
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
