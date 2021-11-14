import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesGateway } from './entities.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from './entities/entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: [EntitiesGateway, EntitiesService],
})
export class EntitiesModule {}
