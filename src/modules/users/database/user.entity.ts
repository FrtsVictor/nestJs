import { RoleEntity } from '@app-modules/roles/database/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_roles',
    inverseJoinColumn: {
      name: 'role_id',
      foreignKeyConstraintName: 'FK_role_id',
    },
    joinColumn: { name: 'user_id', foreignKeyConstraintName: 'FK_user_id' },
  })
  roles: RoleEntity[];
}
