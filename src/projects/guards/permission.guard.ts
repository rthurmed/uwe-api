import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class PermissionGuard implements CanActivate {
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
        const projectId = req.params.id;
        const result = await this.permissionService.findAcceptedByUserId(
          userId,
          [projectId],
        );
        resolve(result.length > 0);
      } catch (error) {
        reject(error);
      }
    });
  }
}
