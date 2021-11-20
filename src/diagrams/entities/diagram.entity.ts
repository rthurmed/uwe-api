import { Project } from '../../projects/entities/project.entity';
import {
  Column,
  Entity as TypeEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Base } from '../../core/base.entity';
import { DiagramType } from './diagram-type.enum';
import { Entity } from '../../entities/entities/entity.entity';

@TypeEntity({ name: 'diagrams' })
export class Diagram extends Base {
  @Column()
  name: string;

  @Column({
    name: 'type',
    enum: DiagramType,
    default: DiagramType.USECASE,
    update: false,
  })
  type: DiagramType;

  @Column({ name: 'project_id', update: false })
  projectId: number;

  @ManyToOne(() => Project, (project: Project) => project.diagrams, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToMany(() => Entity, (entity: Entity) => entity.diagram)
  entities: Entity[];
}
