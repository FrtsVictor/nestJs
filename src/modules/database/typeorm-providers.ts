import { AppEnvironmentService } from '@app-commons/api/config/environment.service';
import { getDataSource } from './typeorm-data-source';

export const TYPEORM_DATA_SOURCE = 'TYPEORM_DATA_SOURCE';

export const typeormDatabaseProvider = [
  {
    provide: TYPEORM_DATA_SOURCE,
    useFactory: async (envService: AppEnvironmentService) => {
      return await getDataSource(envService.databaseConfig).initialize();
    },
    inject: [AppEnvironmentService],
  },
];
