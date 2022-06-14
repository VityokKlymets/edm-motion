import { RequestHandler, Router } from "express"

class BaseController {
  protected router: Router

  constructor() {
    this.router = Router()
  }

  protected post(path: string, handler: RequestHandler | RequestHandler[]) {
    this.router.post(path, handler)
  }

  protected get(path: string, handler: RequestHandler | RequestHandler[]) {
    this.router.get(path, handler)
  }

  protected use(handlers: RequestHandler[]) {
    this.router.use(handlers)
  }

  public get Router() {
    return this.router
  }
}

export default BaseController
