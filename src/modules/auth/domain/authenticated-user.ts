import {
  verifyArrayEmpty,
  verifyEmail,
  verifyNumberPositive,
} from 'src/commons/domain/property-validator';

export type IAuthenticatedUserProps = {
  email: string;
  sub: number;
  roles: string[];
};

export class AuthenticatedUser {
  #email: string;
  #sub: number;
  #roles: string[];

  private constructor(props: IAuthenticatedUserProps) {
    this.#email = props.email;
    this.#roles = props.roles;
    this.#sub = props.sub;
  }

  static create(props: IAuthenticatedUserProps) {
    return new AuthenticatedUser(props);
  }

  get email() {
    return this.#email;
  }

  public set email(email: string) {
    verifyEmail(email);
    this.#email = email;
  }

  get sub() {
    return this.#sub;
  }

  set sub(sub: number) {
    verifyNumberPositive(sub, 'sub');
    this.#sub = sub;
  }

  get roles() {
    return this.#roles;
  }

  set roles(roles: string[]) {
    verifyArrayEmpty(roles, 'roles');
    this.#roles = roles;
  }
}
