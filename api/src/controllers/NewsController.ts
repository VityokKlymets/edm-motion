import { Request, Response, json } from "express"
import BaseController from "controllers/BaseController"
import NewsService from "services/NewsService"
import withFormData from "middlewares/withFormData"
import withAdmin from "middlewares/withAdmin"
import withClassValidation from "middlewares/withClassValidation"

class NewsController extends BaseController {
  private service = new NewsService()
  constructor() {
    super()

    this.post("/list", [withAdmin(), json(), this.list])
    this.post("/add", [withAdmin(), withFormData(), withClassValidation(), this.add])
    this.post("/update", [withAdmin(), withFormData(), withClassValidation(), this.update])
    this.post("/listClient", [json(), this.listClient])
    this.post("/search", [json(), this.search])
  }

  private list = async (req: Request, res: Response) => {
    const data: IEntityListByPageRequest = req.body
    const result = await this.service.listNewsByPage(data)

    const response: IEntityListResponse = {
      ...result,
      status: "ok",
    }

    res.json(response)
  }

  private listClient = async (req: Request, res: Response) => {
    const data: INewsClientListRequest = req.body
    const result = await this.service.listNewsClient(data)

    const response: IEntityListResponse = {
      ...result,
      status: "ok",
    }

    res.json(response)
  }

  private search = async (req: Request, res: Response) => {
    const data: IEntitySearchByFieldsRequest = req.body
    const result = await this.service.searchNews(data)

    const response: IEntityListResponse = {
      ...result,
      status: "ok",
    }

    res.json(response)
  }

  private add = async (req: Request, res: Response) => {
    const data: INewsAddRequest = req.body

    const news = await this.service.addNews(data)
    const responce: IEntityAddResponse = {
      status: "ok",
      entities: [news],
    }

    res.json(responce)
  }

  private update = async (req: Request, res: Response) => {
    const data: INewsUpdateRequest = req.body

    const news = await Promise.all(await this.service.updateNews(data))

    const responce: IEntityUpdateResponse = {
      status: "ok",
      entities: news,
    }

    res.json(responce)
  }
}
export default NewsController
