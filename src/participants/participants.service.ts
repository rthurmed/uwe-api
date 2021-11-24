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

  async move(id: number, x: number, y: number): Promise<Participant> {
    const participant = await this.repository.findOneOrFail(id);
    participant.x = x;
    participant.y = y;
    return await this.repository.save(participant);
  }
}
