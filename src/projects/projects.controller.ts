import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser, Resource } from 'nest-keycloak-connect';
import { PermissionsService } from 'src/permissions/permissions.service';
import { FindConditions, FindManyOptions, In } from 'typeorm';
import { BaseController } from '../core/base.controller';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { OwnerGuard } from './guards/owner.guard';
import { PermissionGuard } from './guards/permission.guard';
import { ProjectService } from './projects.service';

@Controller('projects')
@Resource(Project.name)
export class ProjectController extends BaseController<Project> {
  constructor(
    private readonly projectService: ProjectService,
    private readonly permissionService: PermissionsService
  ) {
    super(projectService)
  }

  override async getSearchOptions (request: Request, user: any): Promise<FindConditions<Project> | FindManyOptions<Project>> {
    // Project are only shown if the user have the right permissions
    const ids = (await this.permissionService.findAcceptedByUserId(user.sub)).map(e => e.projectId)
    return {
      where: { id: In(ids) },
      relations: [ "permissions" ]
    }
  }

  @Post()
  async create(
    @Body() body: CreateProjectDTO,
    @AuthenticatedUser() user
  ): Promise<Project> {
    return await this.projectService.createWithOwner(body as Project, user.sub)
  }

  @UseGuards(OwnerGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateProjectDTO
  ): Promise<Project> {
    return await this.service.update(id, body as Project)
  }

  @UseGuards(PermissionGuard)
  @Get(':id')
  override async findOne(
    @Param('id') id: number
  ): Promise<Project> {
    return await this.service.findOne(id)
  }

  @UseGuards(PermissionGuard)
  @Delete(':id')
  override async remove(
    @Param('id') id: number
  ) {
    return await this.service.remove(id)
  }
}
