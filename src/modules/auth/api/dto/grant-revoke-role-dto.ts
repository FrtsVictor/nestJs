import { IsNotEmpty, IsPositive } from 'class-validator';

export class GrantRevokeRoleRequestDto {
  @IsPositive()
  userId: number;

  @IsNotEmpty()
  userRoleIds: number[];
}
