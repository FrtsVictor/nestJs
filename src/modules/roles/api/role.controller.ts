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

@Controller('role')
@PublicRoute()
export class RoleController {
  constructor(private readonly roleService: IRoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
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
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
