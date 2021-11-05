import { Controller, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDTO } from './dto/create-permission.dto';
import { UpdatePermissionDTO } from './dto/update-permission.dto';
import { AcceptPermissionDTO } from './dto/accept-permission.dto';
import { BaseController } from '../core/base.controller';
import { Permission } from './entities/permission.entity';
import { Resource } from 'nest-keycloak-connect';
import { FindConditions, FindManyOptions } from 'typeorm';
import { Request } from 'express';
import { ProjectOwnerCreateGuard } from './guards/project-owner-create.guard';
import { ProjectOwnerUpdateGuard } from './guards/project-owner-update.guard';
import { OnlySubjectUserGuard } from './guards/only-subject-user.guard';

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
    @Body() createPermissionDto: CreatePermissionDTO
  ): Promise<Permission> {
    return this.permissionsService.create(createPermissionDto as unknown as Permission);
  }

  @UseGuards(ProjectOwnerUpdateGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDTO
  ): Promise<Permission> {
    return this.permissionsService.update(id, updatePermissionDto as unknown as Permission);
  }

  @UseGuards(OnlySubjectUserGuard)
  @Post('accept/:id')
  async accept(
    @Param('id') id: number,
    @Body() acceptPermissionDTO: AcceptPermissionDTO
  ): Promise<Permission> {
    return this.permissionsService.update(id, acceptPermissionDTO as unknown as Permission)
  }
}
