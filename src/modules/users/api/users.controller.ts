import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PublicRoute } from '../../../commons/api/decorators/public-route.decorator';
import { NestResponseBuilder } from '../../../commons/api/http/nest-response-builder';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from '../domain/user-service.interface';
import { UserMapper } from './users.mapper';

@Controller('/users')
export class UserController {
  constructor(private userService: IUserService) {}

  @Post()
  @PublicRoute()
  async createUser(@Body() request: CreateUserDto) {
    const userToCreate = UserMapper.createDtoToDomain(request);
    const createdId = await this.userService.create(userToCreate);

    return new NestResponseBuilder()
      .withHeaders({ Location: `/users/${createdId}` })
      .withBody({ id: createdId })
      .build();
  }

  @Get()
  async geAll() {
    return new NestResponseBuilder()
      .withBody(this.userService.findAll())
      .build();
  }

  @Get('/:id')
  async geById(@Param('id') id: number) {
    return new NestResponseBuilder()
      .withBody(this.userService.findOne(id))
      .build();
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: number, @Body() request: UpdateUserDto) {
    const userToUpdate = UserMapper.updateDtoToDomain(request);
    await this.userService.update(id, userToUpdate);

    return new NestResponseBuilder()
      .withHeaders({ Location: `/users/${id}` })
      .build();
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    this.userService.remove(id);
  }
}
