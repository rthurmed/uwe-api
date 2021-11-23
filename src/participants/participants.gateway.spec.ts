import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsGateway } from './participants.gateway';
import { ParticipantsService } from './participants.service';

describe('ParticipantsGateway', () => {
  let gateway: ParticipantsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantsGateway, ParticipantsService],
    }).compile();

    gateway = module.get<ParticipantsGateway>(ParticipantsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
