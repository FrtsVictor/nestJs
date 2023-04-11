import { dataSource } from './typeorm-data-source';

export const TYPEORM_DATA_SOURCE = 'TYPEORM_DATA_SOURCE';

export const typeormDatabaseProvider = [
  {
    provide: TYPEORM_DATA_SOURCE,
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
