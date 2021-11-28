import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DiagramsService } from '../diagrams/diagrams.service';
import { WsGuard } from '../security/guards/ws-guard.guard';
import { WsParticipantGuard } from '../security/guards/ws-participant.guard';
import { MoveDTO } from './dto/move.dto';
import { Participant } from './entities/participant.entity';
import { ParticipantsService } from './participants.service';

@UseGuards(WsGuard)
@WebSocketGateway(Number(process.env.WS_PORT), {
  cors: {
    origin: process.env.WS_ORIGINS.split(','),
    credentials: true,
  },
})
export class ParticipantsGateway {
  constructor(
    private readonly participantsService: ParticipantsService,
    private readonly diagramsService: DiagramsService,
  ) {}

  @WebSocketServer()
  server: Server;

  // join
  // leave
  // move
  // grab
  // drop

  @SubscribeMessage('join')
  async join(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    // Verify if can join the diagram room
    const userId = client.data.user.sub;
    const permissions = await this.diagramsService.getPermissions(userId, id);
    if (permissions.length < 1) {
      return;
    }

    const participant = new Participant();
    participant.diagramId = id;
    participant.userId = userId;

    const newParticipant = await this.participantsService.create(participant);

    client.data.participant = newParticipant;

    // Join the room (https://socket.io/docs/v4/rooms/)
    client.join(String(id));
    this.server.to(String(id)).emit('join', newParticipant);
  }

  @UseGuards(WsParticipantGuard)
  @SubscribeMessage('leave')
  async leave(@ConnectedSocket() client: Socket) {
    const participant: Participant = client.data.participant;
    this.server.to(String(participant.diagramId)).emit('leave', participant.id);
    await this.participantsService.remove(participant.id);
    client.data = null;
  }

  @UseGuards(WsParticipantGuard)
  @SubscribeMessage('move')
  async move(@MessageBody() dto: MoveDTO, @ConnectedSocket() client: Socket) {
    const caller: Participant = client.data.participant;
    const participant = await this.participantsService.move(
      caller.id,
      dto.x,
      dto.y,
    );

    this.server.to(String(participant.diagramId)).emit('move', {
      participantId: participant.id,
      x: participant.x,
      y: participant.y,
    });
  }

  @UseGuards(WsParticipantGuard)
  @SubscribeMessage('grab')
  async grab(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    const caller: Participant = client.data.participant;
    const participant = await this.participantsService.grab(caller.id, id);
    if (participant.grabbedId !== id) {
      return;
    }
    this.server.to(String(participant.diagramId)).emit('grab', {
      participantId: participant.id,
      entityId: participant.grabbedId,
    });
  }

  @UseGuards(WsParticipantGuard)
  @SubscribeMessage('drop')
  async drop(@ConnectedSocket() client: Socket) {
    const caller: Participant = client.data.participant;
    const participant = await this.participantsService.drop(caller.id);
    this.server.to(String(participant.diagramId)).emit('drop', {
      participantId: participant.id,
    });
  }
}
