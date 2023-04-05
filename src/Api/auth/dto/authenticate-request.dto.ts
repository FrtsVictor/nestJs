import { IsNotEmpty } from 'class-validator';

export class AuthenticateRequestDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
