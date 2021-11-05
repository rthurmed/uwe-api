import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { CreatePermissionDTO } from "../dto/create-permission.dto";
import { AccessLevel } from "../entities/access-level.enum";
import { PermissionsService } from "../permissions.service";

@Injectable()
export class ProjectOwnerCreateGuard implements CanActivate {
  constructor (
    @Inject(PermissionsService)
    private permissionService: PermissionsService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const req: Request = context.switchToHttp().getRequest();
        const userId = req["user"].sub;
        const dto: CreatePermissionDTO = req.body;
        const projectId = dto.projectId
        const result = await this.permissionService
          .findAcceptedByUserId(userId, [
            projectId.toString()
          ], [
            AccessLevel.OWNER
          ]);
        resolve(result.length > 0);
      } catch (error) {
        reject(error);
      }
    })
  }
} 
