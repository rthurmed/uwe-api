import { DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Query, Req } from "@nestjs/common";
import { BaseService } from './base.service'
import { Pagination } from "nestjs-typeorm-paginate";
import { Request } from "express";

export class BaseController<T> {
  protected service: BaseService<T>
  constructor (service: BaseService<T>) {
    this.service = service
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
    @Req() request: Request
  ): Promise<Pagination<T>> {
    return this.service.paginate({
      page,
      limit,
      route: request.url
    });
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