import { Delete, Get, Param } from "@nestjs/common";
import { BaseService } from './base.service'
import { ListDTO } from "./base.dto";

export class BaseController<T> {
  protected service: BaseService<T>
  constructor (service: BaseService<T>) {
    this.service = service
  }

  @Get()
  async list(): Promise<ListDTO<T>> {
    const list = await this.service.list()
    const dto: ListDTO<T> =  { list }
    return dto
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise<T> {
    return await this.service.find(id)
  }

  // POST e PUT require DTOs and must be made in each controller

  @Delete(':id')
  async delete(
    @Param('id') id: number
  ) {
    return await this.service.delete(id)
  }
}