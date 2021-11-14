import { ChildEntity, Column, OneToMany } from 'typeorm';
import { Association } from './association.entity';
import { EntityType } from './entity-type.enum';
import { NodeType } from './node-type.enum';

@ChildEntity(EntityType.NODE)
export class Node {
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

  @Column({
    name: 'type',
    enum: NodeType,
    default: NodeType.NOTE,
    update: false,
  })
  type: NodeType;

  @OneToMany(
    () => Association,
    (association: Association) => association.origin,
  )
  originAssociations: Association[];

  @OneToMany(
    () => Association,
    (association: Association) => association.target,
  )
  targetAssociations: Association[];
}
