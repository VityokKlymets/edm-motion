import {
  Connection,
  EntityTarget,
  FindOneOptions,
  getConnection,
  SelectQueryBuilder,
} from "typeorm"
import { uploadFile } from "utils/files"
import { File } from "formidable"
import ApiError from "classes/ApiError"

abstract class EntityServiceBase {
  protected connection: Connection = getConnection()

  protected async add<T>(entityClass: EntityTarget<T>, data): Promise<T> {
    const manager = this.connection.manager
    const entity = manager.create<T>(entityClass, data)
    return manager.save<T>(entity)
  }

  protected async listByPage<T>(
    entityClass: EntityTarget<T>,
    page = 1,
    itemsPerPage = 10,
    order: "DESC" | "ASC" = "DESC"
  ) {
    const repo = this.connection.getRepository<T>(entityClass)

    const qb = repo.createQueryBuilder("entity")
    qb.orderBy("entity.createdAt", order)

    const [items, totalCount] = await this.paginateByPage(qb, page, itemsPerPage)

    return {
      items,
      totalCount,
      itemsPerPage,
    }
  }

  protected async deleteById<T>(entityClass: EntityTarget<T>, id: number) {
    const entity = await this.findById(entityClass, id)
    return this.connection.manager.remove(entityClass, entity)
  }

  protected async delete<T>(entity: T) {
    return this.connection.manager.remove(entity)
  }

  protected async update<T>(entityClass: EntityTarget<T>, entity: any): Promise<T> {
    const repository = this.connection.getRepository<T>(entityClass)
    return repository.save(entity)
  }

  protected async findByFields<T>(entityClass: EntityTarget<T>, query: string, fields: string[]) {
    const repo = this.connection.getRepository<T>(entityClass)
    const qb = repo.createQueryBuilder("entity")

    fields.forEach((field) =>
      qb.where(`LOWER(${field}) LIKE :query`, { query: `%${query.toLowerCase()}%` })
    )
    return qb.getMany()
  }

  protected async find<T>(entityClass: EntityTarget<T>) {
    return this.connection.manager.find<T>(entityClass)
  }
  protected async findById<T>(
    entityClass: EntityTarget<T>,
    id: number,
    options?: FindOneOptions<T>
  ) {
    return this.connection.manager.findOne<T>(entityClass, id, options)
  }

  protected async findByIds<T>(entityClass: EntityTarget<T>, ids: number[]) {
    return this.connection.manager.findByIds<T>(entityClass, ids)
  }

  protected async findOne<T>(entityClass: EntityTarget<T>, options?: FindOneOptions<T>) {
    return this.connection.manager.findOne(entityClass, options)
  }

  protected async uploadFile(file: File) {
    const { path, status } = await uploadFile(file)

    if (status === "ok") {
      return { path, isTelegramUpload: true }
    } else {
      throw new ApiError("File upload Error")
    }
  }

  protected async paginateByPage<T>(qb: SelectQueryBuilder<T>, page: number, itemsPerPage: number) {
    return qb
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .getManyAndCount()
  }
}

export default EntityServiceBase
