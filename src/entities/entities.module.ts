import { Module } from '@nestjs/common';
import { Permission } from '../permissions/entities/permission.entity';
import { Diagram } from '../diagrams/entities/diagram.entity';
import { DiagramsService } from '../diagrams/diagrams.service';
import { EntitiesService } from './entities.service';
import { EntitiesGateway } from './entities.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from './entities/entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entity, Diagram, Permission])],
  providers: [EntitiesGateway, EntitiesService, DiagramsService],
})
export class EntitiesModule {}
