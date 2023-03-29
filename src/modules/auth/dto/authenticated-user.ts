import { IsEmail, IsNumber } from 'class-validator';

export class AuthenticatedUser {
  @IsEmail()
  readonly email: string;

  @IsNumber()
  readonly sub: number;

  @IsNumber()
  iat?: number;

  constructor(email: string, sub: number, iat?: number) {
    this.email = email;
    this.sub = sub;
    this.iat = iat;
  }
}
