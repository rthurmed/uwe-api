import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../core/base.service';
import { In, Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { AccessLevel } from './entities/access-level.enum';

@Injectable()
export class PermissionsService extends BaseService<Permission> {
  constructor (
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>
  ) {
    super(permissionRepository)
  }

  findAcceptedByUserId (userId: string, projectIds: string[] = [], levels: AccessLevel[] = []): Promise<Permission[]> {
    const options = {
      where: {
        userId,
        accepted: true,
        revoked: false,
      }
    }
    if (projectIds.length > 0) {
      options.where['projectId'] = In(projectIds)
    }
    if (levels.length > 0) {
      options.where['level'] = In(levels)
    }
    return this.repository.find(options)
  }
}
