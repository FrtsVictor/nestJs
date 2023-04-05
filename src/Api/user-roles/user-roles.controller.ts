import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateUserRoleRequestDto } from './dto/create-user-role.dto';
import { IUserRolesService } from '@app-domain/user-roles/user-service.interface';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: IUserRolesService) {}

  @Post()
  create(@Body() userRoleRequest: CreateUserRoleRequestDto) {
    return this.userRolesService.grantUserRole(userRoleRequest);
  }

  @Get(':id')
  findAllById(@Param('id') id: string) {
    return this.userRolesService.findAll(+id);
  }

  @Delete()
  remove(@Body() userRoleRequest: CreateUserRoleRequestDto) {
    return this.userRolesService.revokeUserRole(userRoleRequest);
  }
}
