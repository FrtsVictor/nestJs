import { Module } from '@nestjs/common';
import { UserRolesController } from './user-roles.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { userRolesProviders } from './user-role.providers';

@Module({
  imports: [PrismaModule],
  providers: [...userRolesProviders],
  controllers: [UserRolesController],
})
export class UserRolesModule {}
