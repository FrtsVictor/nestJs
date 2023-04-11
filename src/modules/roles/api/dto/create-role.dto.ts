import { IsNotEmpty, Length } from 'class-validator';

export class CreateRoleDto {
  @Length(4, 50)
  @IsNotEmpty()
  name: string;
}
