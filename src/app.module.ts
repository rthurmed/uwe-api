import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { KeycloakModule } from './config/keycloak.module';

@Module({
  imports: [KeycloakModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
