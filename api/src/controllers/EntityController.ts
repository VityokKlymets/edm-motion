import { Request, Response, json } from "express"
import BaseController from "controllers/BaseController"
import withFormData from "middlewares/withFormData"
import withAdmin from "middlewares/withAdmin"
import EntityService from "services/EntityService"

class EntityController extends BaseController {
  private service = new EntityService()
  constructor() {
    super()
    this.post("/list", [withAdmin(), json(), this.list])
    this.post("/delete", [withAdmin(), json(), this.delete])
    this.post("/update", [withAdmin(), withFormData(), this.update])
    this.post("/findByIds", [withAdmin(), json(), this.findByIds])
    this.post("/findByFields", [withAdmin(), json(), this.findByFields])
  }
  private list = async (req: Request, res: Response) => {
    const data: IEntityListRequest = req.body

    const { target, page } = data
    const result = await this.service.listByPage(target, page)

    const response: IEntityListResponse = {
      ...result,
      status: "ok",
    }

    res.json(response)
  }

  private update = async (req: Request, res: Response) => {
    const data: IEntityUpdateRequest = req.body

    const { target } = data
    const entity = await this.service.update(target, data)

    const response: IEntityUpdateResponse = {
      status: "ok",
      entities: [entity],
    }
    res.json(response)
  }

  private delete = async (req: Request, res: Response) => {
    const data: IEntityDeleteRequest = req.body
    const { target, id } = data

    await this.service.deleteEntityById(target, id)

    const response: IEntityDeleteResponse = {
      status: "ok",
      affected: 1,
    }

    res.json(response)
  }

  private findByIds = async (req: Request, res: Response) => {
    const data: IEntityFindByIdsRequest = req.body
    const { target, ids } = data

    const entities = await this.service.findByIds(target, ids)

    const responce: IEntityFindResponse = {
      status: "ok",
      entities,
    }
    res.json(responce)
  }

  private findByFields = async (req: Request, res: Response) => {
    const data: IEntitySearchByFieldsRequest = req.body
    const { target, query, fields } = data

    const entities = await this.service.findByFields(target, query, fields)

    const result = entities.map(({ id, string }) => ({
      id,
      title: string,
    }))

    const responce: IEntitySearchResponse = {
      status: "ok",
      result,
    }
    res.json(responce)
  }
}
export default EntityController
