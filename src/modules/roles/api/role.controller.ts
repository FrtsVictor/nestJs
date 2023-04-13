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
import { IRoleService } from '../domain/role-service.interface';
import { RoleDtoDomainMapper } from './role-dto-domain.mapper';
import { NestResponseBuilder } from '@app-commons-api/http/nest-response-builder';
import { AppEnvironmentService } from '@app-commons-api/config/environment.service';
import { PublicRoute } from '@app-commons-api/decorators/public-route.decorator';

@PublicRoute()
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: IRoleService,
    private readonly environmentService: AppEnvironmentService,
  ) {}

  @Post()
  async create(@Body() request: CreateRoleDto) {
    const roleToBeCreated = RoleDtoDomainMapper.createRoleDtoToDomain(request);
    const createdId = await this.roleService.create(roleToBeCreated);

    return new NestResponseBuilder()
      .withStatus(201)
      .withBody({ id: createdId })
      .withHeaders({ Location: `/role/${createdId}` })
      .build();
  }

  @Get()
  async findAll() {
    const roles = await this.roleService.findAll();
    const response = RoleDtoDomainMapper.domainsToGetRoleDtoList(roles);
    return new NestResponseBuilder()
      .withStatus(200)
      .withBody({ response })
      .build();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number) {
  //   const role = await this.roleService.findOne(id);

  //   return new NestResponseBuilder().withStatus(200).withBody(role).build();
  // }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() request: UpdateRoleDto) {
    const userToBeUpdated = RoleDtoDomainMapper.updateUserDtoToDomain(request);
    await this.roleService.update(id, userToBeUpdated);

    return new NestResponseBuilder().withStatus(204).build();
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.roleService.remove(id);

    return new NestResponseBuilder().withStatus(204).build();
  }

  @PublicRoute()
  @Get('/tessst')
  async getEnv() {
    console.log(await this.environmentService.databaseConfig);
  }
}
