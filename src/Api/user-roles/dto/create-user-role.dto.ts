import { IsNumber, IsOptional } from 'class-validator';

export class CreateUserRoleRequestDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  roleId?: number;

  @IsNumber()
  @IsOptional()
  roleIds?: number[];
}
