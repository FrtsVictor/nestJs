import { ForbiddenException } from '@nestjs/common';
import { JwtResponseDto } from '../dto/jwt-response.dto';
import { AuthenticatedUser } from '../dto/authenticated-user';

export abstract class IAuthService {
  abstract validateUser(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUser | ForbiddenException>;

  abstract login(user: AuthenticatedUser): JwtResponseDto | ForbiddenException;
}
