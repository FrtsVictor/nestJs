import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AuthenticatedUser {
  @IsEmail()
  readonly email: string;

  @IsNumber()
  readonly sub: number;

  @IsNumber()
  iat?: number;

  @IsNotEmpty()
  readonly roles: string[];

  constructor(email: string, sub: number, iat?: number) {
    this.email = email;
    this.sub = sub;
    this.iat = iat;
  }
}
