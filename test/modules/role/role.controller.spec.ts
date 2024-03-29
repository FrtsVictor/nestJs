import { RoleController } from '@app-modules/roles/api/role.controller';
import { IRoleService } from '@app-modules/roles/domain/role-service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

describe('RoleController', () => {
  const mockedRoleService = mock<IRoleService>();
  let controller: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: IRoleService,
          useValue: mockedRoleService,
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
