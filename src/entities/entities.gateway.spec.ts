import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesGateway } from './entities.gateway';
import { EntitiesService } from './entities.service';

describe('EntitiesGateway', () => {
  let gateway: EntitiesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntitiesGateway, EntitiesService],
    }).compile();

    gateway = module.get<EntitiesGateway>(EntitiesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
