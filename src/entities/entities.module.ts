import { Module } from '@nestjs/common';
import { Permission } from '../permissions/entities/permission.entity';
import { Diagram } from '../diagrams/entities/diagram.entity';
import { DiagramsService } from '../diagrams/diagrams.service';
import { EntitiesService } from './entities.service';
import { EntitiesGateway } from './entities.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from './entities/entity.entity';
import { ParticipantsService } from '../participants/participants.service';
import { Participant } from '../participants/entities/participant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entity, Participant, Diagram, Permission]),
  ],
  providers: [
    EntitiesGateway,
    EntitiesService,
    ParticipantsService,
    DiagramsService,
  ],
})
export class EntitiesModule {}
