import { UserRolesController } from '@app-modules/user-roles/user-roles.controller';
import { UserRolesService } from '@app-modules/user-roles/user-roles.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserRolesController', () => {
  let controller: UserRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRolesController],
      providers: [UserRolesService],
    }).compile();

    controller = module.get<UserRolesController>(UserRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
