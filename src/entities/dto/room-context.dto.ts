import { Diagram } from '../../diagrams/entities/diagram.entity';
import { Room } from '../classes/room';

export class RoomContextDTO {
  constructor(public room: Room = null, public diagram: Diagram = null) {}
}
