import { Module } from '@nestjs/common';
import { DiagramsService } from './diagrams.service';
import { DiagramsController } from './diagrams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagram } from './entities/diagram.entity';
import { PermissionsService } from '../permissions/permissions.service';
import { Permission } from '../permissions/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagram, Permission])],
  controllers: [DiagramsController],
  providers: [DiagramsService, PermissionsService],
})
export class DiagramsModule {}
