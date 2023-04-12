import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { roleProviders } from './role.providers';
import { TypeormModule } from '@app-modules/database/typeorm.module';
import { AppConfigurationModule } from '@app-commons/api/config/configuration.module';

@Module({
  imports: [TypeormModule, AppConfigurationModule],
  controllers: [RoleController],
  providers: [...roleProviders],
})
export class RoleModule {}
