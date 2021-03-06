import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { Entity } from './entities/entity.entity';
import { WsGuard } from '../security/guards/ws-guard.guard';
import { WsIsEditorGuard } from '../security/guards/ws-is-editor.guard';
import { Participant } from '../participants/entities/participant.entity';
import { ParticipantsService } from '../participants/participants.service';

@UseGuards(WsGuard, WsIsEditorGuard)
@WebSocketGateway(Number(process.env.WS_PORT), {
  cors: {
    origin: process.env.WS_ORIGINS.split(','),
    credentials: true,
  },
})
export class EntitiesGateway {
  constructor(
    private readonly entitiesService: EntitiesService,
    private readonly participantService: ParticipantsService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('create')
  async create(
    @MessageBody() createEntityDto: CreateEntityDto,
    @ConnectedSocket() client: Socket,
  ) {
    const caller: Participant = client.data.participant;
    const entity = await this.entitiesService.create(
      createEntityDto as unknown as Entity,
    );
    this.server.to(String(caller.diagramId)).emit('create', entity);
  }

  @SubscribeMessage('patch')
  async patch(
    @MessageBody() updateEntityDto: UpdateEntityDto,
    @ConnectedSocket() client: Socket,
  ) {
    const caller: Participant = client.data.participant;
    const entity = await this.entitiesService.update(
      updateEntityDto.id,
      updateEntityDto as unknown as Entity,
    );
    this.server.to(String(caller.diagramId)).emit('patch', entity);
  }

  @SubscribeMessage('delete')
  async delete(@ConnectedSocket() client: Socket) {
    // FIXME: Not reaching this point
    const caller: Participant = client.data.participant;
    const participant = await this.participantService.findOne(caller.id);
    if (participant.grabbedId == null) {
      return;
    }

    const currentEntity = await this.entitiesService.findOne(
      participant.grabbedId,
      {
        relations: ['targetEntities', 'originEntities'],
      },
    );

    const entitiesIds: Array<number> = [
      ...currentEntity.targetEntities.map((e) => e.id),
      ...currentEntity.originEntities.map((e) => e.id),
    ];

    await this.entitiesService.remove(participant.grabbedId);

    this.server
      .to(String(caller.diagramId))
      .emit('drop', { participantId: caller.id });

    this.server
      .to(String(caller.diagramId))
      .emit('delete', participant.grabbedId);

    // Also delete target and origin entities
    entitiesIds.forEach((id) => {
      this.server.to(String(caller.diagramId)).emit('delete', id);
    });
  }
}
