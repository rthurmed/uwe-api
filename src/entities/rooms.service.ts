import { Injectable } from '@nestjs/common';
import { Position } from './classes/position';
import { Room } from './classes/room';

@Injectable()
export class RoomsService {
  private rooms = new Map<number, Room>();
  private participants = new Map<string, number>();

  join(userId: string, diagramId: number): Room {
    // Create the room if dont exists
    if (!this.rooms.has(diagramId)) {
      this.rooms.set(diagramId, new Room(diagramId));
    }

    const room: Room = this.rooms.get(diagramId);
    room.join(userId);

    this.participants.set(userId, diagramId);

    return room;
  }

  leave(userId: string): number {
    const diagramId = this.participants.get(userId);
    const count = this.rooms[diagramId].leave(userId);
    this.participants.delete(userId);

    // Delete the room if empty
    if (count < 1) {
      this.rooms.delete(diagramId);
    }

    return count;
  }

  grab(userId: string, entityId: number) {
    //
  }

  move(userId: string, position: Position) {
    const diagramId = this.participants.get(userId);
    this.rooms[diagramId].move(userId, position);
  }
}
