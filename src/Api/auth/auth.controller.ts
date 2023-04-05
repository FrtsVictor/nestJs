import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { PublicRoute } from '../core/decorators/public-route.decorator';
import { IAuthService } from '@app-domain/auth/auth-service.interface';
import { LocalAuthGuard } from '@app-api/core/guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
