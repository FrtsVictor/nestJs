import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PublicRoute } from '../../core/decorators/public-route.decorator';
import { NestResponseBuilder } from '../../core/http/nest-response-builder';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserService } from './user.service';
import { EnvironmentService } from '../../core/config/environment.service';
//import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
    private myEnvs: EnvironmentService,
  ) {}

  @Post()
  @PublicRoute()
  async createUser(@Body() request: CreateUserDto) {
    const createdId = await this.userService.create(request);

    return new NestResponseBuilder()
      .withHeaders({ Location: `/users/${createdId}` })
      .withBody({ id: createdId })
      .build();
  }

  @Get()
  async geAll() {
    return new NestResponseBuilder()
      .withBody(this.userService.getAll())
      .build();
  }

  @Get('/:id')
  async geById(@Param('id') id: number) {
    return new NestResponseBuilder()
      .withBody(this.userService.getById(id))
      .build();
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new NestResponseBuilder()
      .withHeaders({ Location: `/users/${id}` })
      .withBody(this.userService.update(id, updateUserDto));
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    this.userService.deleteById(id);
  }
}
