import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { AccessLevel } from "../../permissions/entities/access-level.enum";
import { PermissionsService } from "../../permissions/permissions.service";
import { DiagramsService } from "../diagrams.service";

@Injectable()
export class DiagramParamGuard implements CanActivate {
  constructor (
    @Inject(DiagramsService)
    private diagramsService: DiagramsService,
    @Inject(PermissionsService)
    private permissionsService: PermissionsService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const req: Request = context.switchToHttp().getRequest();

        // Ignore if the route dont have the param to verify
        if (!("id" in req.params)) { resolve(true) }

        const accessLevels = [
          AccessLevel.OWNER
        ]

        // If reading something allow to editor and visualizer
        if (req.method === "GET") {
          accessLevels.push(AccessLevel.READ, AccessLevel.WRITE)
        }

        const diagramId = req.params.id;
        const userId = req["user"].sub;

        const subject = await this.diagramsService.findOne(Number(diagramId));

        // FIXME: Is causing 500 error when should be returning 404
        const projectId = subject.projectId;
        const permissions = await this.permissionsService.findAcceptedByUserId(userId, [
          projectId.toString()
        ], accessLevels);

        resolve(permissions.length > 0);
      } catch (error) {
        reject(error);
      }
    })
  }
}