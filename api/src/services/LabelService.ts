import Label from "models/Label"
import EntityServiceBase from "services/EntityServiceBase"

class LabelService extends EntityServiceBase {
  public async addLabel(data: ILabelAddRequest) {
    const { name } = data
    const entity = { name }
    return this.add(Label, entity)
  }

  public async updateLabel(data: ILabelUpdateRequest) {
    const { name, id } = data
    const label = await this.findById(Label, id)
    label.name = name
    return [this.update(Label, label)]
  }

  public async getAll() {
    return this.find(Label)
  }
}
export default LabelService
