import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from './model/role.entity';
import { TypeormRoleRepository } from './typeorm-role.repository';

describe('TypeormRoleRepository Test', () => {
  let dataSource: DataSource;
  let roleRepo: Repository<RoleEntity>;
  let typeormRoleRepository: TypeormRoleRepository;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: true,
      entities: [RoleEntity],
    });
    await dataSource.initialize();
    roleRepo = dataSource.getRepository(RoleEntity);
    typeormRoleRepository = new TypeormRoleRepository(roleRepo);
  });

  it('should insert a new bank account', async () => {
    const role = new RoleEntity();
    role.id = 1;
    role.name = 'test-role';
    role.createdAt = new Date();

    await typeormRoleRepository.create(role);
    const model = await typeormRoleRepository.findOne(1);

    expect(model.id).toBe(1);
    expect(model.name).toBe('test-role');
  });
});
