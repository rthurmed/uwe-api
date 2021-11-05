import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { AccessLevel } from "../entities/access-level.enum";
import { PermissionsService } from "../permissions.service";

@Injectable()
export class ProjectOwnerUpdateGuard implements CanActivate {
  constructor (
    @Inject(PermissionsService)
    private permissionService: PermissionsService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const req: Request = context.switchToHttp().getRequest();
        const userId = req["user"].sub;
        const permissionId = req.params.id;
        const original = await this.permissionService.findOne(Number(permissionId))
        const result = await this.permissionService
          .findAcceptedByUserId(userId, [
            original.projectId.toString()
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
