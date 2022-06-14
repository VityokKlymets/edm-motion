import EntityServiceBase from "services/EntityServiceBase"

class SetupService extends EntityServiceBase {
  public async reupdateEntity(data: IEntityRequest) {
    const { target } = data
    const entities = await this.find(target)

    const promises = entities.map((entity) => this.update(target, entity))

    await Promise.all(promises)

    return entities
  }
}

export default SetupService
