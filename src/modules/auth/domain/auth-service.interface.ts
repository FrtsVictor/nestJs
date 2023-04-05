import { ForbiddenException } from '@nestjs/common';
import { JwtResponseDto } from '../api/dto/jwt-response.dto';
import { AuthenticatedUser } from './authenticated-user';

export abstract class IAuthService {
  abstract validateUser(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUser | ForbiddenException>;

  abstract login(user: AuthenticatedUser): JwtResponseDto | ForbiddenException;
}
