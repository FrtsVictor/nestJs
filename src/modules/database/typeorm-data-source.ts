import { DataBaseConfig } from '@app-commons/api/config/typeorm.config';
import { RoleEntity } from '@app-modules/roles/database/role.entity';
import { UserEntity } from '@app-modules/users/database/user.entity';
import { DataSource } from 'typeorm';

export const getDataSource = ({ host, pass, port, user }: DataBaseConfig) =>
  new DataSource({
    type: 'mssql',
    host,
    port,
    logging: 'all',
    username: user,
    password: pass,
    migrationsRun: true,
    synchronize: false,
    options: {
      encrypt: false,
    },
    entities: [UserEntity, RoleEntity],
  });
