import { Project } from "../../projects/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../../core/base.entity";
import { DiagramType } from "./diagram-type.enum";

@Entity({ name: 'diagrams' })
export class Diagram extends Base {
  @Column()
  name: string;

  @Column({ name: 'type', enum: DiagramType, default: DiagramType.USECASE })
  type: DiagramType;

  @Column({ name: 'project_id', update: false })
  projectId: number;

  @ManyToOne(() => Project, (project: Project) => project.diagrams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  // TODO: Entities list
}
