import { Module } from '@nestjs/common';
import { typeormDatabaseProvider } from './typeorm-providers';
import { AppConfigurationModule } from '@app-commons/api/config/configuration.module';

@Module({
  imports: [AppConfigurationModule],
  providers: [...typeormDatabaseProvider],
  exports: [...typeormDatabaseProvider],
})
export class TypeormModule {}
