import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../core/base.service';
import { Repository } from 'typeorm';
import { Diagram } from './entities/diagram.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class DiagramsService extends BaseService<Diagram> {
  constructor(
    @InjectRepository(Diagram)
    private diagramRepository: Repository<Diagram>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {
    super(diagramRepository);
  }

  async getPermissions(
    userId: string,
    diagramId: number,
  ): Promise<Permission[]> {
    const subject = await this.diagramRepository.findOneOrFail(diagramId);
    const projectId = subject.projectId;
    return this.permissionRepository.find({
      where: {
        accepted: true,
        revoked: false,
        projectId: projectId,
        userId: userId,
      },
    });
  }
}
