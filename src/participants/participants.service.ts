import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core/base.service';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantsService extends BaseService<Participant> {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {
    super(participantRepository);
  }
}
