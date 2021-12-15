import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser, Resource } from 'nest-keycloak-connect';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PermissionsService } from 'src/permissions/permissions.service';
import { FindConditions, In, Like } from 'typeorm';
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
    private readonly permissionService: PermissionsService,
  ) {
    super(projectService, ['permissions', 'diagrams']);
  }

  @Get()
  async search(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
    @Query('name') name,
    @Req() request: Request,
    @AuthenticatedUser() user,
  ): Promise<Pagination<Project>> {
    // Project are only shown if the user have the right permissions
    const projectIds = (
      await this.permissionService.findAcceptedByUserId(user.sub)
    ).map((e) => e.projectId);

    const findConditions: FindConditions<Project> = {
      id: In(projectIds),
    };

    if (name) {
      findConditions.name = Like(`%${name}%`);
    }

    return this.projectService.paginate(
      {
        page,
        limit,
        route: request.url,
      },
      {
        where: findConditions,
        relations: ['permissions', 'diagrams'],
      },
    );
  }

  @Post()
  async create(
    @Body() body: CreateProjectDTO,
    @AuthenticatedUser() user,
  ): Promise<Project> {
    return await this.projectService.createWithOwner(body as Project, user.sub);
  }

  @UseGuards(OwnerGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateProjectDTO,
  ): Promise<Project> {
    return await this.service.update(id, body as Project);
  }

  @UseGuards(PermissionGuard)
  @Get(':id')
  override async findOne(@Param('id') id: number): Promise<Project> {
    return await this.service.findOne(id, {
      relations: this.defaultRelations,
    });
  }

  @UseGuards(PermissionGuard)
  @Delete(':id')
  override async remove(@Param('id') id: number) {
    return await this.service.remove(id);
  }
}
