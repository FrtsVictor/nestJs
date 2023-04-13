import {
  verifyEmail,
  verifyNumberPositive,
  verifyStringSize,
} from '@app-commons-domain/property-validator';
import { Role } from '@app-modules/roles/domain/role';

export type UserProps = {
  id?: number;
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  roles?: Role[];
};

export class User {
  id?: number;
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  roles?: Role[];

  private constructor(props: UserProps) {
    this.setEmail(props.email);
    this.setName(props.name);
    this.setPassword(props.password);
    props.id ?? this.setId(props.id);

    if (props.roles) this.roles = props.roles;

    return this;
  }

  static create(props: UserProps) {
    return new User(props);
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
