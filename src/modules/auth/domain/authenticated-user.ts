export class AuthenticatedUser {
  readonly email: string;

  readonly sub: number;

  iat?: number;

  readonly roles: string[];

  constructor(email: string, sub: number, iat?: number) {
    this.email = email;
    this.sub = sub;
    this.iat = iat;
  }
}
