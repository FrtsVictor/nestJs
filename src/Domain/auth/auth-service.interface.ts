import { ForbiddenException } from '@nestjs/common';
import { AuthenticatedUser } from './model/authenticated-user';
import { JwtResponseDto } from '@app-api/auth/dto/jwt-response.dto';

export abstract class IAuthService {
  abstract validateUser(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUser | ForbiddenException>;

  abstract login(user: AuthenticatedUser): JwtResponseDto | ForbiddenException;
}
