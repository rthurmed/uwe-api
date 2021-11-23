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
}
