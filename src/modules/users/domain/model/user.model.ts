import {
  verifyEmail,
  verifyNumberPositive,
  verifyStringSize,
} from 'src/commons/domain/property-validator';
import { Role } from '@app-modules/roles/domain/role';

export class User {
  id: number;
  email: string;
  name: string;
  password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  roles: Role[];

  constructor(
    name: string,
    email: string,
    password: string,
    roles?: Role[],
    id?: number,
  ) {
    this.setEmail(email);
    this.setName(name);
    this.setPassword(password);
    id ?? this.setId(id);

    if (roles) this.roles = roles;

    return this;
  }

  create(name: string) {
    this.setName(name);
  }

  setName(name: string) {
    verifyStringSize(name, 150, 'name');
    this.name = name;
  }

  setPassword(password: string) {
    verifyStringSize(password, 5, 'password');
    this.password = password;
  }

  setId(id: number) {
    verifyNumberPositive(id, 'id');
    this.id = id;
  }

  setEmail(email: string) {
    verifyEmail(email);
    this.email = email;
  }
}
