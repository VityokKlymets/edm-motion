import JWTStrategy from "auth/JWTStrategy"
import { Request, Response } from "express"
import User from "models/User"
import passport from "passport"

const withUser = (callback?: (user: User) => any) => {
  passport.use(JWTStrategy())
  return (req: Request, res: Response, next: Function) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) {
        return next(err)
      }
      req.user = user
      if (callback) {
        callback(user)
      } else {
        next()
      }
    })(req, res, next)
  }
}

export default withUser
