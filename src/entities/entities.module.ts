import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesGateway } from './entities.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './entities/association.entity';
import { Entity } from './entities/entity.entity';
import { Node } from './entities/node.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entity, Association, Node])],
  providers: [EntitiesGateway, EntitiesService],
})
export class EntitiesModule {}
