import { Controller, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { BaseController } from '../core/base.controller';
import { Permission } from './entities/permission.entity';
import { Resource } from 'nest-keycloak-connect';
import { FindConditions, FindManyOptions } from 'typeorm';
import { Request } from 'express';
import { ProjectOwnerCreateGuard } from './guards/project-owner-create.guard';
import { ProjectOwnerUpdateGuard } from './guards/project-owner-update.guard';

@Controller('permissions')
@Resource(Permission.name)
export class PermissionsController extends BaseController<Permission> {
  constructor(private readonly permissionsService: PermissionsService) {
    super(permissionsService)
  }

  override async getSearchOptions (request: Request, user: any): Promise<FindConditions<Permission> | FindManyOptions<Permission>> {
    return new Promise((resolve, rejects) => {
      resolve({
        where: {
          userId: user.sub
        },
        relations: [ "project" ]
      });
    })
  }

  @UseGuards(ProjectOwnerCreateGuard)
  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto
  ): Promise<Permission> {
    return this.permissionsService.create(createPermissionDto as unknown as Permission);
  }

  @UseGuards(ProjectOwnerUpdateGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto
  ): Promise<Permission> {
    return this.permissionsService.update(id, updatePermissionDto as unknown as Permission);
  }

  // TODO: Accept route, accessible to the subject user
}
