import { IsNotEmpty } from 'class-validator';

export class AuthenticationDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
