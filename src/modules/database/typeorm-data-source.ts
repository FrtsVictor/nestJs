import { RoleEntity } from '@app-modules/roles/infra/model/role.entity';
import { UserEntity } from '@app-modules/users/infra/model/user.entity';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  logging: 'all',
  username: 'sa',
  password: 'PassWord!321',
  migrationsRun: true,
  synchronize: false,
  options: {
    encrypt: false,
  },
  entities: [UserEntity, RoleEntity],
});
