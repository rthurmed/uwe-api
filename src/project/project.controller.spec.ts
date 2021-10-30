import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestDatabaseModule } from '../../test/utils/database';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

describe('ProjectController', () => {
  let projectController: ProjectController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        TypeOrmModule.forFeature([Project])
      ],
      controllers: [ProjectController],
      providers: [ProjectService],
    }).compile();

    projectController = app.get<ProjectController>(ProjectController);
  });

  describe('root', () => {
    it('should return an empty list', () => {
      projectController.list()
        .then((result) => {
          expect(result).toBe({ list: [] });
        })
        .catch(fail);
    });
  });
});
