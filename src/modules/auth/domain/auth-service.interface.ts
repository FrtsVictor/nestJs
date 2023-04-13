import { JwtResponseDto } from '../api/dto/jwt-response.dto';
import { AuthenticatedUser } from './authenticated-user';
import { GrantRevokeRoleRequestDto } from '../api/dto/grant-revoke-role-request.dto';

export abstract class IAuthService {
  abstract grantUserRoles(request: GrantRevokeRoleRequestDto): Promise<void>;
  abstract revokeRoles(request: GrantRevokeRoleRequestDto): Promise<void>;
  abstract login(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUser | never>;

  abstract getToken(user: AuthenticatedUser): Promise<JwtResponseDto | never>;
}
