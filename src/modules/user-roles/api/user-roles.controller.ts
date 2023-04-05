import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserRoleRequest } from './dto/user-role.dto';
import { IUserRolesService } from '../domain/user-service.interface';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: IUserRolesService) {}

  @Post()
  create(@Body() userRoleRequest: UserRoleRequest) {
    return this.userRolesService.grantUserRole(userRoleRequest);
  }

  @Get(':id')
  findAllById(@Param('id') id: string) {
    return this.userRolesService.findAll(+id);
  }

  @Delete()
  remove(@Body() userRoleRequest: UserRoleRequest) {
    return this.userRolesService.revokeUserRole(userRoleRequest);
  }
}
