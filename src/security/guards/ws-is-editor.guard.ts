import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { Permission } from '../../permissions/entities/permission.entity';
import { DiagramsService } from '../../diagrams/diagrams.service';
import { AccessLevel } from '../../permissions/entities/access-level.enum';

@Injectable()
export class WsIsEditorGuard implements CanActivate {
  constructor(
    @Inject(DiagramsService)
    private diagramsService: DiagramsService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve) => {
      try {
        const client: Socket = context.switchToWs().getClient();

        if (!('participant' in client.data)) {
          resolve(false);
        }

        const { userId, diagramId } = client.data.participant;
        const permissions = await this.diagramsService.getPermissions(
          userId,
          diagramId,
        );

        const result = permissions.find((permission: Permission) =>
          [AccessLevel.READ, AccessLevel.OWNER].includes(permission.level),
        );

        resolve(result !== null);
      } catch (e) {
        resolve(false);
      }
    });
  }
}
