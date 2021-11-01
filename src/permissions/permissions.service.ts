import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/base.service';
import { DeepPartial, Repository } from 'typeorm';
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

  override create(entity: DeepPartial<Permission>): Promise<Permission> {
    return this.repository.save(entity)
  }
}
