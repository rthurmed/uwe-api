import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { Resource } from 'nest-keycloak-connect';
import { BaseController } from '../core/base.controller';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectService } from './projects.service';

@Controller('projects')
@Resource(Project.name)
export class ProjectController extends BaseController<Project> {
  constructor(private readonly projectService: ProjectService) {
    super(projectService)
  }

  @Post()
  async create(
    @Body() body: CreateProjectDTO
  ): Promise<Project> {
    return await this.service.create(body as Project)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateProjectDTO
  ): Promise<Project> {
    return await this.service.update(id, body as Project)
  }
}
