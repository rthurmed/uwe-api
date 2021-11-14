import { ChildEntity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { AssociationType } from './association-type.enum';
import { EntityType } from './entity-type.enum';
import { Entity } from './entity.entity';
import { Node } from './node.entity';

@ChildEntity(EntityType.ASSOCIATION)
export class Association extends Entity {
  @Column({
    name: 'type',
    enum: AssociationType,
    default: AssociationType.ASSOCIATION,
    update: false,
  })
  type: AssociationType;

  @ManyToOne(() => Node, (node: Node) => node.originAssociations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'origin_id' })
  origin: Node;

  @ManyToOne(() => Node, (node: Node) => node.targetAssociations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'target_id' })
  target: Node;
}
