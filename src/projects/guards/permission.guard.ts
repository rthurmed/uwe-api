import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Permission } from "src/permissions/entities/permission.entity";
import { Repository } from "typeorm";
import { Observable } from "rxjs";
import { PermissionsService } from "src/permissions/permissions.service";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor (
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @Inject(PermissionsService)
    private permissionService: PermissionsService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve, reject) => {
      const req: Request = context.switchToHttp().getRequest();
      const userId = req["user"].sub;
      const projectId = req.params.id;
      try {
        const result = await this.permissionService.findAcceptedByUserId(userId, [projectId]);
        resolve(result.length > 0);
      } catch (error) {
        reject(error);
      }
    })
  }
}