import { Permission } from "../../permissions/entities/permission.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date', name: 'created_at', default: new Date() })
  createdAt: Date;

  @OneToMany(() => Permission, (permission: Permission) => permission.project)
  permissions: Permission[];
}