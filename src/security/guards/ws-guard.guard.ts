import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { parseToken } from '../../entities/utils';

@Injectable()
export class WsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve) => {
      try {
        const client: Socket = context.switchToWs().getClient();
        const bearer = client.handshake.headers.authorization.split(' ')[1];
        client.data.user = parseToken(bearer);
        // FIXME: find a way to authenticate with keycloak
        resolve('sub' in client.data.user);
      } catch (e) {
        resolve(false);
      }
    });
  }
}
