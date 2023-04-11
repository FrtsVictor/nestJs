import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthenticateRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(5, 100)
  @IsNotEmpty()
  password: string;
}
