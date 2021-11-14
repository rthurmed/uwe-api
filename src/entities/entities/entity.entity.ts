import { Base } from 'src/core/base.entity';
import { Diagram } from 'src/diagrams/entities/diagram.entity';
import {
  Column,
  Entity as TypeEntity,
  ManyToOne,
  TableInheritance,
} from 'typeorm';

@TypeEntity({ name: 'entities' })
@TableInheritance({
  column: {
    type: 'number',
    name: 'itype',
  },
})
export class Entity extends Base {
  @Column()
  title: string;

  @ManyToOne(() => Diagram, (diagram: Diagram) => diagram.entities)
  diagram: Diagram;
}
