export class GetUserRolesResponseDto {
  userId: number;
  roles: UserRole[];
}

type UserRole = {
  id: number;
  assignedDate: Date;
};
