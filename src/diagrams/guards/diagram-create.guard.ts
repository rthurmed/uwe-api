import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AccessLevel } from '../../permissions/entities/access-level.enum';
import { PermissionsService } from '../../permissions/permissions.service';
import { CreateDiagramDTO } from '../dto/create-diagram.dto';

@Injectable()
export class DiagramCreateGuard implements CanActivate {
  constructor(
    @Inject(PermissionsService)
    private permissionService: PermissionsService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const req: Request = context.switchToHttp().getRequest();
        const userId = req['user'].sub;
        const dto: CreateDiagramDTO = req.body;
        const projectId = dto.projectId;

        const permissions = await this.permissionService.findAcceptedByUserId(
          userId,
          [projectId.toString()],
          [AccessLevel.OWNER],
        );

        resolve(permissions.length > 0);
      } catch (error) {
        reject(error);
      }
    });
  }
}
