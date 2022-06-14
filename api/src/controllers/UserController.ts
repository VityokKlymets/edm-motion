import { Request, Response, json } from "express"
import BaseController from "controllers/BaseController"
import UserService from "services/UserService"
import passport from "passport"
import User from "models/User"
import JWTStrategy from "auth/JWTStrategy"
import withUser from "middlewares/withUser"
import withClassValidation from "middlewares/withClassValidation"

interface IRequest extends Request {
  user: User
}

class UserController extends BaseController {
  private service = new UserService()
  constructor() {
    super()
    passport.use(JWTStrategy())

    this.post("/register", [json(), withClassValidation(User), this.register])
    this.post("/login", [json(), this.login])
    this.post("/authorize", [json(), withUser(), this.authorize])
  }

  private register = async (req: Request, res: Response) => {
    const data: IUserAddRequest = req.body
    const user = await this.service.addUser(data)

    const response: IUserAddResponse = {
      status: "ok",
      user,
    }

    res.json(response)
  }

  private authorize = async (req: IRequest, res: Response) => {
    const response: IUserAuthorizeResponse = {
      status: "ok",
      user: req?.user,
    }
    res.json(response)
  }

  private login = async (req: Request, res: Response) => {
    const data: IUserLoginRequest = req.body
    const { token, user } = await this.service.login(data)

    const response: IUserLoginResponse = {
      status: "ok",
      token,
      user,
    }

    res.json(response)
  }
}
export default UserController
