import EntityServiceBase from "services/EntityServiceBase"
import { EntityTarget, FindOneOptions } from "typeorm"

class EntityService extends EntityServiceBase {
  public async listByPage<T>(target: Entities, page: number, itemsPerPage = 10) {
    return super.listByPage<T>(target, page, itemsPerPage)
  }
  public async findByIds<T>(target: Entities, ids: number[]) {
    return super.findByIds<T>(target, ids)
  }

  public async findByFields<T>(target: Entities, query: string, fields: string[]) {
    return super.findByFields<T>(target, query, fields)
  }

  public async findOne(target: Entities, options?: FindOneOptions<any>) {
    return super.findOne(target, options)
  }

  public async find<T>(entityClass: EntityTarget<T>) {
    return super.find<T>(entityClass)
  }

  public async deleteEntityById(target: Entities, id: number) {
    return super.deleteById(target, id)
  }

  public async add<T>(target: Entities, data: any) {
    return super.add<T>(target, data)
  }
  public async update<T>(target: Entities, updateData: any) {
    const record = await this.findById(target, updateData.id)

    for (const key of Object.keys(record)) {
      if (key in updateData) {
        record[key] = updateData[key]
      }
    }

    return super.update<T>(target, record)
  }
}

export default EntityService
