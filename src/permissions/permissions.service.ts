import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../core/base.service';
import { DeepPartial, In, Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService extends BaseService<Permission> {
  constructor (
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>
  ) {
    super(permissionRepository)
  }

  findAcceptedByUserId (userId: string, projectIds: string[] = []): Promise<Permission[]> {
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
    return this.repository.find(options)
  }
}
