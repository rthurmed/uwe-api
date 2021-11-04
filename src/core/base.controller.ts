import { DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Query, Req } from "@nestjs/common";
import { BaseService } from './base.service'
import { Pagination } from "nestjs-typeorm-paginate";
import { Request } from "express";
import { FindConditions, FindManyOptions } from "typeorm";
import { AuthenticatedUser } from "nest-keycloak-connect";
import { rejects } from "assert";

export class BaseController<T> {
  constructor (
    protected service: BaseService<T>
  ) {}

  async getSearchOptions (request: Request, user: any): Promise<FindConditions<T> | FindManyOptions<T>> {
    return new Promise((resolve, rejects) => {
      resolve({})
    })
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
    @Req() request: Request,
    @AuthenticatedUser() user,
  ): Promise<Pagination<T>> {
    return this.service.paginate(
      {
        page,
        limit,
        route: request.url
      },
      await this.getSearchOptions(request, user)
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise<T> {
    return await this.service.findOne(id)
  }

  // POST e PUT require DTOs and must be made in each controller

  @Delete(':id')
  async remove(
    @Param('id') id: number
  ) {
    return await this.service.remove(id)
  }
}