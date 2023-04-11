import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtResponseDto } from './dto/jwt-response.dto';
import { AuthenticatedUser } from '../domain/authenticated-user';
import { IAuthService } from '../domain/auth-service.interface';
import { GrantRevokeRoleRequestDto } from './dto/grant-revoke-role-dto';
import { IUserService } from '@app-modules/users/domain/users-service.interface';
import { User } from '@app-modules/users/domain/model/user.model';

export class AuthService implements IAuthService {
  constructor(
    private userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async grantUserRoles({
    userId,
    rolesIds,
  }: GrantRevokeRoleRequestDto): Promise<void> {
    await this.userService.grantRoles(userId, rolesIds);
  }

  async revokeRoles({
    userId,
    rolesIds,
  }: GrantRevokeRoleRequestDto): Promise<void> {
    await this.userService.revokeRoles(userId, rolesIds);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (this.#isInvalidValidUser(user, password)) {
      throw new ForbiddenException(`User or password doesn't match`);
    }

    const roles = user.roles.map((it) => it.name);
    return new AuthenticatedUser(user.email, user.id, roles);
  }

  async getToken(user: AuthenticatedUser) {
    if (this.#isInvalidAuthenticatedUser(user)) {
      throw new ForbiddenException(
        `Invalid authenticated user to set at payload! \n User: ${user}`,
      );
    }

    const { email, sub, roles } = user;
    const payload = { email, sub, roles };
    const token = await this.jwtService.signAsync(payload);

    return new JwtResponseDto(token);
  }

  #isInvalidAuthenticatedUser(user: AuthenticatedUser) {
    return !user || !user.email || !user.sub || !user.roles;
  }

  #isInvalidValidUser(user: User, password: string) {
    return !(user && user.password === password && user.roles.length >= 1);
  }
}
