import { IRoleService } from '@app-modules/roles/interface/role-service.interface';
import { RoleController } from '@app-modules/roles/api/role.controller';
import { RoleService } from '@app-modules/roles/domain/role.service';
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
