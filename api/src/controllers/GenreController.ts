import { Request, Response } from "express"
import BaseController from "controllers/BaseController"
import withFormData from "middlewares/withFormData"
import withAdmin from "middlewares/withAdmin"
import withClassValidation from "middlewares/withClassValidation"
import GenreService from "services/GenreService"

class GenreController extends BaseController {
  private service = new GenreService()
  constructor() {
    super()
    this.post("/add", [withAdmin(), withFormData(), withClassValidation(), this.add])
    this.post("/update", [withAdmin(), withFormData(), withClassValidation(), this.update])
  }

  private add = async (req: Request, res: Response) => {
    const data: IGenreAddRequest = req.body

    const genre = await this.service.addGenre(data)

    const response: IEntityAddResponse = {
      status: "ok",
      entities: [genre],
    }

    res.json(response)
  }

  private update = async (req: Request, res: Response) => {
    const data: IGenreUpdateRequest = req.body

    const entities = await Promise.all(await this.service.updateGenre(data))
    const response: IEntityUpdateResponse = {
      status: "ok",
      entities,
    }

    res.json(response)
  }
}
export default GenreController
