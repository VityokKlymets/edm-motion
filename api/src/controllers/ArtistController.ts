import { Request, Response } from "express"
import BaseController from "controllers/BaseController"
import withFormData from "middlewares/withFormData"
import withAdmin from "middlewares/withAdmin"
import ArtistService from "services/ArtistService"
import withClassValidation from "middlewares/withClassValidation"
import { json } from "express"

class ArtistController extends BaseController {
  private service = new ArtistService()
  constructor() {
    super()
    this.post("/add", [withAdmin(), withFormData(), withClassValidation(), this.add])
    this.post("/update", [withAdmin(), withFormData(), withClassValidation(), this.update])
    this.post("/list", [withAdmin(), json(), this.list])
    this.post("/listClient", [json(), this.listClient])
  }

  private list = async (req: Request, res: Response) => {
    const data: IEntityListByPageRequest = req.body
    const result = await this.service.listArtistByPage(data)

    const response: IEntityListResponse = {
      ...result,
      status: "ok",
    }

    res.json(response)
  }

  private add = async (req: Request, res: Response) => {
    const data: IArtistAddRequest = req.body

    const artist = await this.service.addArtist(data)
    const response: IEntityAddResponse = {
      status: "ok",
      entities: [artist],
    }

    res.json(response)
  }

  private update = async (req: Request, res: Response) => {
    const data: IArtistUpdateRequest = req.body

    const entities = await Promise.all(await this.service.updateArtist(data))
    const response: IEntityUpdateResponse = {
      status: "ok",
      entities,
    }

    res.json(response)
  }

  private listClient = async (req: Request, res: Response) => {
    const data: IEntityListByPageRequest = req.body

    const result = await this.service.listArtistClient(data)

    const response: IEntityListResponse = {
      status: "ok",
      ...result,
    }

    res.json(response)
  }
}
export default ArtistController
