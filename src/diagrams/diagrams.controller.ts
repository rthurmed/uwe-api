import { Controller, Post, Body, Param, Put, UseGuards, Get } from '@nestjs/common';
import { Request } from 'express';
import { FindConditions, FindManyOptions, In } from 'typeorm';
import { BaseController } from '../core/base.controller';
import { PermissionsService } from '../permissions/permissions.service';
import { DiagramsService } from './diagrams.service';
import { CreateDiagramDTO } from './dto/create-diagram.dto';
import { UpdateDiagramDTO } from './dto/update-diagram.dto';
import { Diagram } from './entities/diagram.entity';
import { DiagramParamGuard } from './guards/diagram-param.guard';
import { DiagramCreateGuard } from './guards/diagram-create.guard';

/**
 * Diagram controller
 * 
 * Handles all requests to manage diagrams
 * 
 * Diagrams can be create, updated and deleted by users with owner permission level
 * 
 * The diagram list only returns diagrams in which the user has permission to interact with (read permission minimum)
 * 
 * Diagram update can only change its name
 */
@Controller('diagrams')
@UseGuards(DiagramParamGuard) // only applied to GET, PUT and DELETE
export class DiagramsController extends BaseController<Diagram> {
  constructor(
    private readonly diagramsService: DiagramsService,
    private readonly permissionsService: PermissionsService
  ) {
    super(diagramsService)
  }

  override async getSearchOptions (request: Request, user: any): Promise<FindConditions<Diagram> | FindManyOptions<Diagram>> {
    const ids = (
        await this.permissionsService
          .findAcceptedByUserId(
            user.sub,
            [],
            [],
            ['projectId']
          )
      )
        .map(e => e.projectId)

    return {
      where: {
        projectId: In(ids)
      },
      relations: [ "project" ]
    }
  }

  @UseGuards(DiagramCreateGuard)
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
