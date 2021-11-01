import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { KeycloakModule } from './config/keycloak.module';
import { ProjectModule } from './projects/projects.module';
import { PermissionsModule } from './permissions/permissions.module';

// TODO: Diagramas module

@Module({
  imports: [KeycloakModule, DatabaseModule, ProjectModule, PermissionsModule],
})
export class AppModule {}
