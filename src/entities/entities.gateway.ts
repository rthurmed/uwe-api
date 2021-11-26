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
import { UseGuards } from '@nestjs/common';
import { WsGuard } from '../security/guards/ws-guard.guard';
import { DiagramsService } from 'src/diagrams/diagrams.service';
import { Entity } from './entities/entity.entity';
import { Participant } from '../participants/entities/participant.entity';

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
    private readonly diagramsService: DiagramsService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('create')
  async create(
    @ConnectedSocket() client: Socket,
    @MessageBody() createEntityDto: CreateEntityDto,
  ) {
    // TODO: Grant the user can access the diagram
    const caller: Participant = client.data.participant;
    const entity = await this.entitiesService.create(
      createEntityDto as unknown as Entity,
    );
    this.server.to(String(caller.diagramId)).emit('create', entity);
  }

  @SubscribeMessage('patch')
  patch(@MessageBody() updateEntityDto: UpdateEntityDto) {
    //
  }

  @SubscribeMessage('delete')
  delete(@MessageBody() id: number) {
    //
  }
}
