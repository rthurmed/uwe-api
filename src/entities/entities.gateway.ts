import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
import { Position } from './classes/position';
import { RoomContextDTO } from './dto/room-context.dto';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from './guards/ws-guard.guard';
import { DiagramsService } from 'src/diagrams/diagrams.service';

@UseGuards(WsGuard)
@WebSocketGateway(Number(process.env.WS_PORT), {
  cors: {
    origin: process.env.WS_ORIGINS.split(','),
    credentials: true,
  },
})
export class EntitiesGateway {
  constructor(
    private readonly entitiesService: EntitiesService,
    private readonly roomsService: RoomsService,
    private readonly diagramsService: DiagramsService,
  ) {}

  @WebSocketServer()
  server: Server;

  /**
   * Join the editor for a diagram
   *
   * @param id diagram id
   */
  @SubscribeMessage('join')
  async join(
    @MessageBody() id: number,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<RoomContextDTO>> {
    // Verify if can join the diagram room
    const userId = client.data.user.sub;
    const permissions = await this.diagramsService.getPermissions(userId, id);
    if (permissions.length < 1) {
      return;
    }

    // Join the room (https://socket.io/docs/v4/rooms/)
    client.join(String(id));
    this.server.to(String(id)).emit('join', client.id); // broadcast it to all

    // Send back the context (all the info about the current room)
    const room = this.roomsService.join(client.data.user.sub, id);
    const diagram = await this.diagramsService.findOne(id, {
      relations: ['entities'],
    });
    return {
      event: 'context',
      data: new RoomContextDTO(room, diagram),
    };
  }

  @SubscribeMessage('leave')
  leave(@ConnectedSocket() client: Socket) {
    //
  }

  /**
   * Change mouse location of the current user
   */
  @SubscribeMessage('move')
  move() {
    this.roomsService.move('21321', new Position({ x: 0, y: 0 }));
  }

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
}
