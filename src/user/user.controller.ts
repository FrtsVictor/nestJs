import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/set-metadata.decorator';
import { EnvironmentService } from 'src/config/environment.service';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
    private myEnvs: EnvironmentService,
  ) {}

  @Post()
  @Public()
  async createUser(@Body() request: CreateUserDto) {
    const userCreated = await this.userService.create(request);

    return new NestResponseBuilder()
      .withHeaders({ Location: `/users/${userCreated.id}` })
      .withBody(userCreated)
      .build();
  }

  @Get()
  async geAll() {
    return new NestResponseBuilder()
      .withBody(this.userService.getAll())
      .build();
  }

  @Get('/:id')
  async geById(@Param('id') id: string) {
    return new NestResponseBuilder()
      .withBody(this.userService.getById(id))
      .build();
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new NestResponseBuilder()
      .withHeaders({ Location: `/users/${id}` })
      .withBody(this.userService.update(id, updateUserDto));
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    this.userService.deleteById(id);
  }
}
