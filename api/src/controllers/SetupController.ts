import { Request, Response } from "express"
import BaseController from "controllers/BaseController"
import SetupService from "services/SetupService"

import withAdmin from "middlewares/withAdmin"
import { json } from "express"

class SetupController extends BaseController {
  private service = new SetupService()
  constructor() {
    super()
    this.post("/reupdateEntity", [withAdmin(), json(), this.reupdateEntity])
  }

  private reupdateEntity = async (req: Request, res: Response) => {
    const data: IEntityRequest = req.body
    const entities = await this.service.reupdateEntity(data)

    const response: IEntityUpdateResponse = {
      entities,
      status: "ok",
    }

    res.json(response)
  }
}
export default SetupController
