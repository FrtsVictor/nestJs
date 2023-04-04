export class UserRolesResponse {
  userId: number;
  roles: UserRole[];
}

type UserRole = {
  id: number;
  assignedDate: Date;
};
