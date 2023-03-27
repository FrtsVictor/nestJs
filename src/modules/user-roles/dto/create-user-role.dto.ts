import { IsNumber } from 'class-validator';

export class AddUserRoleDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  roleId: number;
}
