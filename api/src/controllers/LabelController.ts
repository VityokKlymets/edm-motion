import { Request, Response } from "express"
import BaseController from "controllers/BaseController"
import withFormData from "middlewares/withFormData"
import withAdmin from "middlewares/withAdmin"
import withClassValidation from "middlewares/withClassValidation"
import LabelService from "services/LabelService"

class LabelController extends BaseController {
  private service = new LabelService()
  constructor() {
    super()
    this.post("/add", [withAdmin(), withFormData(), withClassValidation(), this.add])
    this.post("/update", [withAdmin(), withFormData(), withClassValidation(), this.update])
  }

  private add = async (req: Request, res: Response) => {
    const data: ILabelAddRequest = req.body

    const label = await this.service.addLabel(data)

    const response: IEntityAddResponse = {
      status: "ok",
      entities: [label],
    }

    res.json(response)
  }

  private update = async (req: Request, res: Response) => {
    const data: ILabelUpdateRequest = req.body

    const entities = await Promise.all(await this.service.updateLabel(data))
    const response: IEntityUpdateResponse = {
      status: "ok",
      entities,
    }

    res.json(response)
  }
}
export default LabelController
