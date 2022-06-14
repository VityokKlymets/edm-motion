import User from "models/User"
import jwt from "jsonwebtoken"
import EntityServiceBase from "services/EntityServiceBase"
import ApiError from "classes/ApiError"
import bcrypt from "bcrypt"

class UserService extends EntityServiceBase {
  private signUser(user: User) {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET
    )
  }

  public async isValidPassword(password: string, user: User) {
    return bcrypt.compare(password, user.password)
  }

  public async authorize(token: string) {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET)
    const { id } = payload

    const user = await this.findById(User, id)
    const newToken = this.signUser(user)
    return {
      token: newToken,
      user,
    }
  }

  public async login(data: IUserLoginRequest) {
    const { password, email } = data
    const user = await this.findOne(User, {
      where: {
        email,
      },
    })
    if (!user) {
      throw new ApiError("User not found!")
    }

    if (await this.isValidPassword(password, user)) {
      return {
        token: this.signUser(user),
        user,
      }
    } else {
      throw new ApiError("Invalid credentials!")
    }
  }

  public async addUser(data: IUserAddRequest) {
    const { password } = data
    const hashedPassword = await bcrypt.hash(password, 10)
    return this.add(User, { ...data, password: hashedPassword })
  }

  public async findUserByEmail(email: string) {
    return this.findOne(User, { where: { email } })
  }

  public async findUserById(id: number) {
    return this.findById(User, id)
  }
}

export default UserService
