import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { BaseController } from '../core/base.controller';
import { Permission } from './entities/permission.entity';
import { Resource } from 'nest-keycloak-connect';

@Controller('permissions')
@Resource(Permission.name)
export class PermissionsController extends BaseController<Permission> {
  constructor(private readonly permissionsService: PermissionsService) {
    super(permissionsService)
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
