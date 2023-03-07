import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserTest } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.create(request);
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
    throw new ForbiddenException('AAAAAAAAAAAAAAAAAAAAAAAAA');
    return new UserTest('my id', 'myName', 'test@email', 'password 123321');
  }
}
