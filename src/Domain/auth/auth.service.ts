import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtVerifyOptions } from '@app-domain/auth/constants';
import { JwtResponseDto } from '../../Api/auth/dto/jwt-response.dto';
import { IAuthService } from '@app-domain/auth/auth-service.interface';
import { IUserService } from '@app-domain/users/user-service.interface';
import { AuthenticatedUser } from '@app-domain/auth/model/authenticated-user';

export class AuthService implements IAuthService {
  constructor(
    private userService: IUserService,
    private jwtService: JwtService,
  ) {}

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
