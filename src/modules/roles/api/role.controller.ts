import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PublicRoute } from '../../../core/decorators/public-route.decorator';
import { IRoleService } from '../domain/role-service.interface';
import { RoleDtoDomainMapper } from './role-dto-to-domain.mapper';

@Controller('role')
@PublicRoute()
export class RoleController {
  constructor(private readonly roleService: IRoleService) {}

  @Post()
  create(@Body() request: CreateRoleDto) {
    const roleToBeCreated = RoleDtoDomainMapper.createRoleDtoToDomain(request);
    return this.roleService.create(roleToBeCreated);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() request: UpdateRoleDto) {
    const userToBeUpdated = RoleDtoDomainMapper.updateUserDtoToDomain(request);
    return this.roleService.update(id, userToBeUpdated);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
