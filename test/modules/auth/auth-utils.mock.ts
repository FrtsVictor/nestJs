import { AuthenticateRequestDto } from '@app-modules/auth/api/dto/authenticate-request.dto';
import { JwtResponseDto } from '@app-modules/auth/api/dto/jwt-response.dto';
import { AuthenticatedUser } from '@app-modules/auth/domain/authenticated-user';
import { GetUserDto } from '@app-modules/users/api/dto/get-user.dto';
import { User } from '@prisma/client';

export class AuthMockUtils {
  static giveMe() {
    const id = 1;
    const name = 'Test Name';
    const email = 'test@test.com';
    const password = 'password';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb213Iiwic3ViIjoyLCJpYXQiOjE2Nzk5MjIxNDJ9.KbJOGtlmRlCPcJ9avwDOzSOQGGitrVQSgyCI7RA_VDI';

    return {
      validateParams: { email, password },
      bearerTokenMock: token,
      prismaUserMock: { id, name, email, password } as User,
      getUserDtoMock: new GetUserDto(name, email, password, id),
      jwtResponseDtoMock: new JwtResponseDto(token),
      authenticatedUserMock: {
        email,
        sub: id,
        iat: 213,
      } as AuthenticatedUser,
      authenticationRequestMock: {
        email,
        password,
      } as AuthenticateRequestDto,
      wrongAuthenticationRequestMock: {
        email: 'wrong@email.com',
        password: 'wrong pass',
      } as AuthenticateRequestDto,
    };
  }
}
