export class AuthenticatedUser {
  readonly name: string;
  readonly email: string;
  readonly id: number;

  constructor(name: string, email: string, id: number) {
    this.name = name;
    this.email = email;
    this.id = id;
  }
}
