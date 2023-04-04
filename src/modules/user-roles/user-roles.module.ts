import { Module } from '@nestjs/common';
import { UserRolesController } from './user-roles.controller';
import { userRolesProviders } from './interfaces/user-role.providers';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [...userRolesProviders],
  controllers: [UserRolesController],
})
export class UserRolesModule {}
