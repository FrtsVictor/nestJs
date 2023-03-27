import { PartialType } from '@nestjs/mapped-types';
import { AddUserRoleDto } from './create-user-role.dto';

export class UpdateUserRoleDto extends PartialType(AddUserRoleDto) {}
