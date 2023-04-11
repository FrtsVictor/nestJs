import { dataSource } from '@app-modules/database/typeorm-data-source';
import { UserEntity } from '@app-modules/users/infra/model/user.entity';
import { DataSource, Repository } from 'typeorm';
describe('test', () => {
  const dataSrc: DataSource = dataSource;
  let repo: Repository<UserEntity>;

  beforeEach(async () => {
    await dataSrc.initialize();
    repo = dataSource.getRepository(UserEntity);
  });

  it('should test', async () => {
    repo
      .createQueryBuilder()
      .insert()
      .into('user_roles')
      .values([{ user_id: 1, role_id: 2 }])
      .execute();
  });
});
