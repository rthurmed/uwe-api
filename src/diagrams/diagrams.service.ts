import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../core/base.service';
import { Repository } from 'typeorm';
import { Diagram } from './entities/diagram.entity';

@Injectable()
export class DiagramsService extends BaseService<Diagram> {
  constructor(
    @InjectRepository(Diagram)
    private diagramRepository: Repository<Diagram>,
  ) {
    super(diagramRepository);
  }
}
