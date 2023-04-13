import { IsNotEmpty, Length } from 'class-validator';

export class CreateRoleRequestDto {
  @Length(4, 50)
  @IsNotEmpty()
  name: string;
}
