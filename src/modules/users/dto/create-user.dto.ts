import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../validator/UniqueEmail.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Invalid name' })
  name: string;

  @IsEmail()
  @UniqueEmail({ message: 'email not unique' })
  email: string;

  @MinLength(4)
  password: string;

  @IsOptional()
  roles?: number[];
}
