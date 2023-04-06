import { Module } from '@nestjs/common';
import { typeormDatabaseProvider } from './typeorm-providers';

@Module({
  providers: [...typeormDatabaseProvider],
  exports: [...typeormDatabaseProvider],
})
export class TypeormModule {}
