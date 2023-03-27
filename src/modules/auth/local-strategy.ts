import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticatedUser } from './dto/authenticated-user';
import { IAuthService } from './interfaces/auth-service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: IAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<AuthenticatedUser | never> {
    const user = await this.authService.validateUser(username, password);

    if (user instanceof ForbiddenException) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
