import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class UserTest {
  @Exclude({ toPlainOnly: true })
  id: string;

  name: string;

  @Expose({
    name: 'myEmail',
  })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
