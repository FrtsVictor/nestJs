import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PublicRoute } from '../../core/decorators/public-route.decorator';
import { IAuthService } from './interfaces/auth-service.interface';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @PublicRoute()
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
