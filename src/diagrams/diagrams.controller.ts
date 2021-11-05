import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BaseController } from '../core/base.controller';
import { DiagramsService } from './diagrams.service';
import { CreateDiagramDTO } from './dto/create-diagram.dto';
import { UpdateDiagramDTO } from './dto/update-diagram.dto';
import { Diagram } from './entities/diagram.entity';

@Controller('diagrams')
export class DiagramsController extends BaseController<Diagram> {
  constructor(private readonly diagramsService: DiagramsService) {
    super(diagramsService)
  }

  // TODO: Apply permission based guard

  @Post()
  async create(
    @Body() createDiagramDto: CreateDiagramDTO
  ): Promise<Diagram> {
    return this.diagramsService.create(createDiagramDto as unknown as Diagram);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDiagramDto: UpdateDiagramDTO
  ): Promise<Diagram> {
    return this.diagramsService.update(id, updateDiagramDto as unknown as Diagram);
  }
}
