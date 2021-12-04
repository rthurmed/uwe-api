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

  async grab(participantId: number, entityId: number): Promise<Participant> {
    const participant = await this.participantRepository.findOneOrFail(
      participantId,
    );
    const othersGrabbing = await this.participantRepository.find({
      where: {
        grabbedId: entityId,
      },
    });

    if (othersGrabbing.length > 0) {
      return participant;
    }

    participant.grabbedId = entityId;

    return await this.participantRepository.save(participant);
  }

  async drop(participantId: number): Promise<Participant> {
    const participant = await this.participantRepository.findOneOrFail(
      participantId,
    );
    participant.grabbedId = null;
    return await this.participantRepository.save(participant);
  }
}
