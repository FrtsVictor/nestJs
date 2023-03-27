import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '../users/interface/user-service.interface';
import { jwtConstants } from './constants';
import { AuthenticatedResponseDto } from './dto/authenticated-response.dto';
import { AuthenticatedUser } from './dto/authenticated-user';
import { IAuthService } from './interfaces/auth-service.interface';

export class AuthService implements IAuthService {
  constructor(
    private userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUser | ForbiddenException> {
    const user = await this.userService.findByEmail(email);

    if (user && user.password === pass) {
      return new AuthenticatedUser(user.name, user.email, user.id);
    }

    return new ForbiddenException('Invalid user or password');
  }

  login(user: AuthenticatedUser) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
    });

    return new AuthenticatedResponseDto(token);
  }
}
