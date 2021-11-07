import { Project } from '../../projects/entities/project.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AccessLevel } from './access-level.enum';
import { Base } from '../../core/base.entity';

@Entity({ name: 'permissions' })
export class Permission extends Base {
  @Column({
    name: 'access_level',
    enum: AccessLevel,
    default: AccessLevel.READ,
  })
  level: AccessLevel;

  @Column({ default: false })
  revoked: boolean;

  @Column({ default: false })
  accepted: boolean;

  @Column({ type: 'date', name: 'revoked_at', nullable: true })
  revokedAt: Date;

  @Column({ name: 'user_id', update: false })
  userId: string;

  @Column({ name: 'project_id', update: false })
  projectId: number;

  @ManyToOne(() => Project, (project: Project) => project.permissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
