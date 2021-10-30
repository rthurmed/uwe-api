import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { BaseService } from '../core/base.service';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor (
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {
    super(projectRepository)
  }
}
