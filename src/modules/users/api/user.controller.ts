import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PublicRoute } from '../../../core/decorators/public-route.decorator';
import { NestResponseBuilder } from '../../../core/http/nest-response-builder';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from '../domain/user-service.interface';
import { UserDtoToDomainMapper } from './user-dto-to-domain.mapper';

@Controller('/users')
export class UserController {
  constructor(private userService: IUserService) {}

  @Post()
  @PublicRoute()
  async createUser(@Body() request: CreateUserDto) {
    const userToCreate = UserDtoToDomainMapper.createUserDtoToDomain(request);
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
    const userToUpdate = UserDtoToDomainMapper.updateUserDtoToDomain(request);
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
