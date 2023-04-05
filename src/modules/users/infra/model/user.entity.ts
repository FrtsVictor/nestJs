export class UserEntity {
  id: number;
  email: string;
  name: string;
  password: string;
  roles: {
    id: number;
    assignedAt: Date;
  }[];
}
