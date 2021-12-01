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

  @Column({ default: '' })
  title: string;

  @Column({ default: 0 })
  x: number;

  @Column({ default: 0 })
  y: number;

  @Column({ default: 0 })
  width: number;

  @Column({ default: 0 })
  height: number;

  @Column({ default: false })
  abstract: boolean;

  @Column({ name: 'diagram_id', update: false })
  diagramId: number;

  @Column({ name: 'origin_id', update: true, nullable: true })
  originId: number;

  @Column({ name: 'target_id', update: true, nullable: true })
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
