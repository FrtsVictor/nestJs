import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EnvironmentService } from 'src/config/environment.service';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserTest } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
    private myEnvs: EnvironmentService,
  ) {}

  @Post()
  async createUser(@Body() request: CreateUserDto) {
    const userCreated = await this.userService.create(request);

    return new NestResponseBuilder()
      .withHeaders({ Location: `/users/${userCreated.id}` })
      .withBody(userCreated)
      .build();
  }

  @Get()
  async geAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  async geById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }

  @Get('/asd/asd')
  async geAll23() {
    return new UserTest('my id', 'myName', 'test@email', 'password 123321');
  }
}
