import { Permission } from '../../permissions/entities/permission.entity';
import { Diagram } from '../../diagrams/entities/diagram.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../core/base.entity';

@Entity({ name: 'projects' })
export class Project extends Base {
  @Column()
  name: string;

  @OneToMany(() => Permission, (permission: Permission) => permission.project)
  permissions: Permission[];

  @OneToMany(() => Diagram, (diagram: Diagram) => diagram.project)
  diagrams: Diagram[];
}
