import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtVerifyOptions } from '../domain/constants';
import { JwtResponseDto } from './dto/jwt-response.dto';
import { AuthenticatedUser } from '../domain/authenticated-user';
import { IAuthService } from '../domain/auth-service.interface';
import { IUserService as IUserRepository } from '@app-modules/users/domain/user-service.interface';
import { GrantRevokeRoleRequestDto } from './dto/grant-revoke-role-dto';

export class AuthService implements IAuthService {
  constructor(
    private userService: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async grantUserRoles(request: GrantRevokeRoleRequestDto): Promise<void> {}

  async revokeRoles(request: GrantRevokeRoleRequestDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user && user.password === password) {
      return new AuthenticatedUser(user.email, user.id);
    }

    throw new ForbiddenException('Invalid user or password');
  }

  login(user: AuthenticatedUser) {
    if (!user || !user.email || !user.sub) {
      throw new ForbiddenException('Invalid user payload');
    }

    const payload = { email: user.email, sub: user.sub };
    const token = this.jwtService.sign(payload, jwtVerifyOptions);

    return new JwtResponseDto(token);
  }
}
