import ApiError from "classes/ApiError"
import { Request, Response } from "express"
import withUser from "middlewares/withUser"
import User from "models/User"

interface IRequest extends Request {
  user: User
}

const withAdmin = () => (req: IRequest, res: Response, next: Function) => {
  withUser((user) => {
    if (user.role === "admin") {
      next()
    } else {
      return next(new ApiError("forbidden!"))
    }
  })(req, res, next)
}

export default withAdmin
