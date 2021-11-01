import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccessLevel } from "./access-level.enum";

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'access_level', enum: AccessLevel, default: AccessLevel.READ })
  level: AccessLevel;

  @Column({ default: false })
  revoked: boolean;

  @Column({ default: false })
  accepted: boolean;

  @Column({ type: 'date', name: 'revoked_at', nullable: true })
  revokedAt: Date;

  @Column({ type: 'date', name: 'created_at', default: new Date() })
  createdAt: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'project_id' })
  projectId: number;

  @ManyToOne(() => Project, (project: Project) => project.permissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
