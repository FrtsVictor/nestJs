import { Exclude } from 'class-transformer';

export class GetUserDto {
  readonly name: string;
  readonly email: string;
  readonly roles?: { id: number; name: string };

  @Exclude({
    toPlainOnly: true,
  })
  readonly password?: string;

  @Exclude({
    toPlainOnly: true,
  })
  readonly id?: number;

  constructor(name: string, email: string, password?: string, id?: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}
