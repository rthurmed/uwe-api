import { Injectable } from '@nestjs/common';
import { BaseService } from '../core/base.service';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantsService extends BaseService<Participant> {}
