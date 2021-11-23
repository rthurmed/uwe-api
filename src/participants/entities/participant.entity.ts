import { Entity as TypeEntity, Column, JoinColumn, OneToOne } from 'typeorm';
import { Base } from '../../core/base.entity';
import { Diagram } from '../../diagrams/entities/diagram.entity';
import { Entity } from '../../entities/entities/entity.entity';

@TypeEntity({ name: 'participant' })
export class Participant extends Base {
  @Column({ name: 'user_id', update: false })
  userId: string;

  @Column({ default: 0 })
  x: number;

  @Column({ default: 0 })
  y: number;

  @Column({ name: 'diagram_id', update: false })
  diagramId: number;

  @Column({ name: 'grabbed_id', update: false })
  grabbedId: number;

  @OneToOne(() => Diagram, {
    nullable: false,
  })
  @JoinColumn({ name: 'diagram_id' })
  diagram: Diagram;

  @OneToOne(() => Entity, {
    nullable: false,
  })
  @JoinColumn({ name: 'grabbed_id' })
  grabbed: Entity;
}
