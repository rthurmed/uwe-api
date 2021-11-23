import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { ParticipantsGateway } from './participants.gateway';
import { Diagram } from 'src/diagrams/entities/diagram.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { DiagramsService } from 'src/diagrams/diagrams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant, Diagram, Permission])],
  providers: [ParticipantsGateway, ParticipantsService, DiagramsService],
})
export class ParticipantsModule {}
