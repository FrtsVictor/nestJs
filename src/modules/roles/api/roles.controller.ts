import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateRoleRequestDto } from './dto/create-role-request.dto';
import { UpdateRoleRequestDto } from './dto/update-role-request.dto';
import { IRoleService } from '../domain/role-service.interface';
import { RolesMapper } from './roles.mapper';
import { NestResponseBuilder } from '@app-commons-api/http/nest-response-builder';
import { AppEnvironmentService } from '@app-commons-api/config/environment.service';
import { PublicRoute } from '@app-commons-api/decorators/public-route.decorator';

@PublicRoute()
@Controller('role')
export class RolesController {
  constructor(
    private readonly roleService: IRoleService,
    private readonly environmentService: AppEnvironmentService,
  ) {}

  @Post()
  async create(@Body() request: CreateRoleRequestDto) {
    const roleToBeCreated = RolesMapper.createRoleDtoToDomain(request);
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
    const response = RolesMapper.domainsToGetRoleDtoList(roles);
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
  async update(@Param('id') id: number, @Body() request: UpdateRoleRequestDto) {
    const userToBeUpdated = RolesMapper.updateUserDtoToDomain(request);
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
