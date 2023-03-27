import { ForbiddenException } from '@nestjs/common';
import { AuthenticatedResponseDto } from '../dto/authenticated-response.dto';
import { AuthenticatedUser } from '../dto/authenticated-user';

export abstract class IAuthService {
  abstract validateUser(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUser | ForbiddenException>;

  abstract login(user: AuthenticatedUser): AuthenticatedResponseDto;
}
