import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { KeycloakModule } from './config/keycloak.module';
import { ProjectModule } from './projects/projects.module';
import { PermissionsModule } from './permissions/permissions.module';
import { DiagramsModule } from './diagrams/diagrams.module';
import { UsersModule } from './users/users.module';
import { EntitiesModule } from './entities/entities.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [
    KeycloakModule,
    DatabaseModule,
    ProjectModule,
    PermissionsModule,
    DiagramsModule,
    UsersModule,
    EntitiesModule,
    ParticipantsModule,
  ],
})
export class AppModule {}
