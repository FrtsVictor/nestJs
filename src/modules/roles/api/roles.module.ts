import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { rolesProviders } from './roles.providers';
import { TypeormModule } from '@app-modules/database/typeorm.module';
import { AppConfigurationModule } from '@app-commons/api/config/configuration.module';

@Module({
  imports: [TypeormModule, AppConfigurationModule],
  controllers: [RolesController],
  providers: [...rolesProviders],
})
export class RoleModule {}
