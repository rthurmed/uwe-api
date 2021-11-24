import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsParticipantGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve) => {
      try {
        const client: Socket = context.switchToWs().getClient();
        resolve('participant' in client.data);
      } catch (e) {
        resolve(false);
      }
    });
  }
}
