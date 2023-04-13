import { UserEntity } from '@app-modules/users/database/model/user.entity';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  user: UserEntity;
}
