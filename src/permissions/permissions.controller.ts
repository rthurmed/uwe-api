import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  BadRequestException,
  Get,
  Query,
  Req,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDTO } from './dto/create-permission.dto';
import { UpdatePermissionDTO } from './dto/update-permission.dto';
import { AcceptPermissionDTO } from './dto/accept-permission.dto';
import { BaseController } from '../core/base.controller';
import { Permission } from './entities/permission.entity';
import { AuthenticatedUser, Resource } from 'nest-keycloak-connect';
import { FindConditions, FindManyOptions } from 'typeorm';
import { Request } from 'express';
import { ProjectOwnerCreateGuard } from './guards/project-owner-create.guard';
import { ProjectOwnerUpdateGuard } from './guards/project-owner-update.guard';
import { OnlySubjectUserGuard } from './guards/only-subject-user.guard';
import { UsersService } from 'src/users/users.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('permissions')
@Resource(Permission.name)
export class PermissionsController extends BaseController<Permission> {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly usersService: UsersService,
  ) {
    super(permissionsService);
  }

  override async getSearchOptions(
    request: Request,
    user: any,
  ): Promise<FindConditions<Permission> | FindManyOptions<Permission>> {
    return new Promise((resolve) => {
      resolve({
        where: {
          userId: user.sub,
        },
        relations: ['project'],
      });
    });
  }

  @Get('/invites')
  async findInvites(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
    @Req() request: Request,
    @AuthenticatedUser() user,
  ): Promise<Pagination<Permission>> {
    return this.service.paginate(
      {
        page,
        limit,
        route: request.url,
      },
      {
        where: {
          userId: user.sub,
          accepted: false,
          revoked: false,
        },
        relations: ['project'],
      },
    );
  }

  @UseGuards(ProjectOwnerCreateGuard)
  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDTO,
  ): Promise<Permission> {
    const user = await this.usersService.findByEmail(createPermissionDto.email);
    if (user == null) {
      throw new BadRequestException('User not found');
    }

    const permissions = await this.permissionsService.findAll({
      where: {
        userId: user.id,
        projectId: createPermissionDto.projectId,
        revoked: false,
      },
    });
    if (permissions.length > 0) {
      throw new BadRequestException('User already member');
    }

    const permission = new Permission();
    permission.userId = user.id;
    permission.level = createPermissionDto.level;
    permission.projectId = createPermissionDto.projectId;

    return this.permissionsService.create(permission);
  }

  @UseGuards(ProjectOwnerUpdateGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDTO,
  ): Promise<Permission> {
    return this.permissionsService.update(
      id,
      updatePermissionDto as unknown as Permission,
    );
  }

  @UseGuards(OnlySubjectUserGuard)
  @Post('accept/:id')
  async accept(
    @Param('id') id: number,
    @Body() acceptPermissionDTO: AcceptPermissionDTO,
  ): Promise<Permission> {
    return this.permissionsService.update(
      id,
      acceptPermissionDTO as unknown as Permission,
    );
  }
}
