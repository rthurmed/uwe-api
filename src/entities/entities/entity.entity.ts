import { Base } from '../../core/base.entity';
import { Diagram } from '../../diagrams/entities/diagram.entity';
import {
  Column,
  Entity as TypeEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntityType } from './entity-type.enum';

@TypeEntity({ name: 'entities' })
export class Entity extends Base {
  @Column({
    name: 'type',
    enum: EntityType,
    default: EntityType.NOTE,
    update: false,
  })
  type: EntityType;

  @Column()
  title: string;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  abstract: boolean;

  @Column({ name: 'diagram_id', update: false })
  diagramId: number;

  @Column({ name: 'origin_id', update: false })
  originId: number;

  @Column({ name: 'target_id', update: false })
  targetId: number;

  @ManyToOne(() => Diagram, (diagram: Diagram) => diagram.entities, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'diagram_id' })
  diagram: Diagram;

  @ManyToOne(() => Entity, (entity: Entity) => entity.originEntities, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'origin_id' })
  origin: Entity;

  @ManyToOne(() => Entity, (entity: Entity) => entity.targetEntities, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'target_id' })
  target: Entity;

  @OneToMany(() => Entity, (entity: Entity) => entity.origin)
  originEntities: Entity[];

  @OneToMany(() => Entity, (entity: Entity) => entity.target)
  targetEntities: Entity[];
}
