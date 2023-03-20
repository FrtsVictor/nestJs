import { AbstractUserService } from './abstract-user-service';
import { UserService } from './user.service';

export const userServiceProviders = {
  provide: AbstractUserService,
  useClass: UserService,
};
