import { IsArray, IsNotEmpty, IsPositive } from 'class-validator';

export class GrantRevokeRoleRequestDto {
  @IsPositive()
  userId: number;

  @IsArray()
  @IsNotEmpty()
  rolesIds: number[];
}
