import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { BaseController } from '../core/base.controller';
import { Permission } from './entities/permission.entity';
import { Resource } from 'nest-keycloak-connect';
import { FindConditions, FindManyOptions } from 'typeorm';
import { Request } from 'express';

@Controller('permissions')
@Resource(Permission.name)
export class PermissionsController extends BaseController<Permission> {
  constructor(private readonly permissionsService: PermissionsService) {
    super(permissionsService)
  }

  override async getSearchOptions (request: Request, user: any): Promise<FindConditions<Permission> | Promise<FindManyOptions<Permission>>> {
    return new Promise((resolve, rejects) => {
      resolve({
        relations: [ "project" ]
      });
    })
  }

  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto
  ): Promise<Permission> {
    return this.permissionsService.create(createPermissionDto as unknown as Permission);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto
  ): Promise<Permission> {
    return this.permissionsService.update(id, updatePermissionDto as unknown as Permission);
  }
}
