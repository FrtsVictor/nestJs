import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { roleProviders } from './role.providers';
import { TypeormModule } from '@app-modules/database/typeorm.module';

@Module({
  imports: [TypeormModule],
  controllers: [RoleController],
  providers: [...roleProviders],
})
export class RoleModule {}
