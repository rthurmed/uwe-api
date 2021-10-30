import { Repository } from "typeorm";

export class BaseService<T> {
  protected repository: Repository<T>
  
  constructor (repository: Repository<T>) {
    this.repository = repository
  }
  
  // TODO: Implement pagination
  list(): Promise<T[]> {
    return this.repository.find()
  }
  
  find(id: number): Promise<T> {
    return this.repository.findOne(id)
  }

  create(entity: T): Promise<T> {
    return this.repository.save(entity)
  }

  update(id: number, entity: T): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const old = await this.repository.findOneOrFail(id)
      const merged = this.repository.merge(old, entity)
      resolve(this.repository.save(merged))
    })
  }
  
  delete(id: number) {
    this.repository.delete(id)
  }
}