import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/base.service';
import { Repository } from 'typeorm';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Entity } from './entities/entity.entity';

@Injectable()
export class EntitiesService extends BaseService<Entity> {
  constructor(
    @InjectRepository(Entity)
    private entityRepository: Repository<Entity>,
  ) {
    super(entityRepository);
  }
}
