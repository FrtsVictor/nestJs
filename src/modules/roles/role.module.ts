import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { roleProviders } from './interface/role.providers';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [...roleProviders],
})
export class RoleModule {}
