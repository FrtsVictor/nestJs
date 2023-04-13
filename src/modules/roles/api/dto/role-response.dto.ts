import { IsPositive, Length } from 'class-validator';

export class RoleResponseDto {
  @IsPositive()
  readonly id: number;

  @Length(4, 50)
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
