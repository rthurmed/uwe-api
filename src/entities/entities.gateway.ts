import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Server } from 'socket.io';

// TODO
@WebSocketGateway()
export class EntitiesGateway {
  constructor(private readonly entitiesService: EntitiesService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('create')
  create(@MessageBody() createEntityDto: CreateEntityDto) {
    //
  }

  @SubscribeMessage('patch')
  patch(@MessageBody() updateEntityDto: UpdateEntityDto) {
    //
  }

  @SubscribeMessage('delete')
  delete(@MessageBody() id: number) {
    //
  }

  @SubscribeMessage('grab')
  grab(@MessageBody() id: number) {
    //
  }

  @SubscribeMessage('drop')
  drop(@MessageBody() id: number) {
    //
  }

  /**
   * Join the editor for a diagram
   *
   * @param id diagram id
   */
  @SubscribeMessage('join')
  join(@MessageBody() id: number) {
    // Verify if can join the diagram room
    // Join the room (https://socket.io/docs/v4/rooms/)
    // Send the context (all the info about the current room) to the user
  }

  /**
   * Change mouse location of the current user
   */
  @SubscribeMessage('move')
  move() {
    //
  }
}
