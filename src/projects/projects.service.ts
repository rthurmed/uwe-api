import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { BaseService } from '../core/base.service';
import { Permission } from 'src/permissions/entities/permission.entity';
import { AccessLevel } from 'src/permissions/entities/access-level.enum';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor (
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>
  ) {
    super(projectRepository)
  }

  createOwner(userId: string, projectId: number): Promise<Permission> {
    return this.permissionRepository.save({
      projectId: projectId,
      userId: userId,
      accepted: true,
      level: AccessLevel.OWNER
    })
  }

  createWithOwner(entity: DeepPartial<Project>, userId: string): Promise<Project> {
    return new Promise(async (resolve, rejects) => {
      try {
        const result = await this.repository.save(entity)
        await this.createOwner(userId, result.id)
        resolve(result)
      } catch (error) {
        rejects(error)
      }
    })
  }
}
