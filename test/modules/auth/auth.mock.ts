import { AuthenticatedUser } from '../../../src/modules/auth/dto/authenticated-user';

export const authenticateRequest = {
  email: 'test@test.com',
  password: 'password',
};

export const wrongAuthRequest = {
  email: 'wrong@email.com',
  password: 'wrong pass',
};

export const userByEmail = {
  id: 1,
  name: 'test',
  email: authenticateRequest.email,
  password: authenticateRequest.password,
};

export const authenticatedUser = new AuthenticatedUser(
  userByEmail.name,
  userByEmail.email,
  userByEmail.id,
);

export const mockedUserRepository = {
  findByEmail: jest.fn(() => Promise.resolve(userByEmail)),
};

export const mockedToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb213Iiwic3ViIjoyLCJpYXQiOjE2Nzk5MjIxNDJ9.KbJOGtlmRlCPcJ9avwDOzSOQGGitrVQSgyCI7RA_VDI';

export const mockedJwtService = {
  sign: jest.fn(() => mockedToken),
};
