import { Module } from '@nestjs/common';
import { DiagramsService } from './diagrams.service';
import { DiagramsController } from './diagrams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagram } from './entities/diagram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagram])],
  controllers: [DiagramsController],
  providers: [DiagramsService]
})
export class DiagramsModule {}
