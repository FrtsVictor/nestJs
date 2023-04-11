export class AuthenticatedUser {
  iat?: number;

  constructor(
    readonly email: string,
    readonly sub: number,
    readonly roles: string[],
    iat?: number,
  ) {
    this.email = email;
    this.sub = sub;
    this.iat = iat;
  }
}
