import { AuthenticatedResponseDto } from '../dto/authenticated-response.dto';
import { AuthenticatedUser } from '../dto/authenticated-user';

export abstract class IAuthService {
  abstract validateUser(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUser>;

  abstract login(user: AuthenticatedUser): AuthenticatedResponseDto;
}
