import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../validator/UniqueEmail.validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Invalid name' })
  name: string;

  @IsEmail()
  @IsOptional()
  @UniqueEmail({ message: 'email not unique' })
  email: string;

  @MinLength(4)
  @IsOptional()
  password: string;
}
