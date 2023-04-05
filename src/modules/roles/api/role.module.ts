import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { roleProviders } from './role.providers';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [...roleProviders],
})
export class RoleModule {}
