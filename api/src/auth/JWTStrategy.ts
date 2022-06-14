import ApiError from "classes/ApiError"
import UserService from "services/UserService"
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt"

const getStrategy = () => {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }

  const JWTStrategy = new Strategy(options, async (payload, done) => {
    const { id } = payload
    const service = new UserService()
    const user = await service.findUserById(id)

    if (!user) {
      return done(new ApiError("no such user"), false)
    }
    return done(null, user)
  })

  return JWTStrategy
}

export default getStrategy
