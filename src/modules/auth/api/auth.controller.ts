import {
  Controller,
  Post,
  UseGuards,
  Request,
  Delete,
  Body,
} from '@nestjs/common';
import { PublicRoute } from '../../../commons/api/decorators/public-route.decorator';
import { IAuthService } from '../domain/auth-service.interface';
import { GrantRevokeRoleRequestDto } from './dto/grant-revoke-role-request.dto';
import { LocalAuthGuard } from '@app-commons/api/guards/local-auth.guard';
import { NestResponseBuilder } from '@app-commons/api/http/nest-response-builder';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    const { token } = await this.authService.getToken(req.user);

    return new NestResponseBuilder()
      .withStatus(200)
      .withBody({ token })
      .build();
  }

  @Post('/role')
  async grantRoles(@Body() request: GrantRevokeRoleRequestDto) {
    await this.authService.grantUserRoles(request);
  }

  @Delete('/role')
  async revokeRoles(@Body() request: GrantRevokeRoleRequestDto) {
    await this.authService.revokeRoles(request);
  }
}
