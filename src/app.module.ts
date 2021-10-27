import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { KeycloakModule } from './config/keycloak.module';
import { ProjectModule } from './project/project.module';

// TODO: Permissions module
// TODO: Diagramas module

@Module({
  imports: [KeycloakModule, DatabaseModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
