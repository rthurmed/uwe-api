import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Permission } from "src/permissions/entities/permission.entity";
import { Repository } from "typeorm";
import { Observable } from "rxjs";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor (
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve, reject) => {
      const req: Request = context.switchToHttp().getRequest();
      const userId = req["user"].sub;
      const projectId = req.params.id;
      try {
        const count = await this.permissionRepository.count({
          where: {
            userId,
            projectId,
            accepted: true,
            revoked: false
          }
        });
        resolve(count > 0);
      } catch (error) {
        reject(error);
      }
    })
  }
}