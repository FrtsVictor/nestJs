import { ForbiddenException } from '@nestjs/common';
import { JwtResponseDto } from '../api/dto/jwt-response.dto';
import { AuthenticatedUser } from './authenticated-user';
import { GrantRevokeRoleRequestDto } from '../api/dto/grant-revoke-role-dto';

export abstract class IAuthService {
  abstract grantUserRoles(request: GrantRevokeRoleRequestDto): Promise<void>;
  abstract revokeRoles(request: GrantRevokeRoleRequestDto): Promise<void>;
  abstract validateUser(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUser | ForbiddenException>;

  abstract login(user: AuthenticatedUser): JwtResponseDto | ForbiddenException;
}
