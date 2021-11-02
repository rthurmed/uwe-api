import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { BaseService } from '../core/base.service';
import { Permission } from 'src/permissions/entities/permission.entity';

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
  
  async findAllByUserId(userId: string): Promise<Project[]> {
    const ids = await this.permissionRepository.find({
      select: ['projectId'],
      where: {
        userId
      },
    })
    console.log(ids.map(e => e.projectId));
    // SELECT pj.*, pm.user_id, pm.project_id
    // FROM projects pj
    // INNER JOIN permissions pm ON pm.project_id = pj.id
    // WHERE
    //   pm.user_id = $0
    return this.repository.createQueryBuilder('projects')
      .innerJoinAndMapMany('projects.permissions', Permission, 'permissions', 'permissions.project_id = projects.id')
      .where('permissions.user_id = :userId', { userId })
      .getMany();
  }
}
