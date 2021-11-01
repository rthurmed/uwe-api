import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { DeepPartial, Repository } from "typeorm";

export class BaseService<T> {
  protected repository: Repository<T>
  
  constructor (repository: Repository<T>) {
    this.repository = repository
  }
  
  paginate(options: IPaginationOptions): Promise<Pagination<T>> {
    return paginate<T>(this.repository, options);
  }

  findAll(): Promise<T[]> {
    return this.repository.find();
  }
  
  findOne(id: number): Promise<T> {
    return this.repository.findOne(id)
  }

  create(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity)
  }

  update(id: number, entity: T): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const old = await this.repository.findOneOrFail(id)
      const merged = this.repository.merge(old, entity)
      resolve(this.repository.save(merged))
    })
  }
  
  remove(id: number) {
    this.repository.delete(id)
  }
}