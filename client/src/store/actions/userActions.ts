import { UserActions, UserTypes } from "store/types"

export const authorizeUser = (user: IUserEntity): UserActions => ({
  type: UserTypes.AUTHORIZE,
  user,
})

export const userLogout = () => ({
  type: UserTypes.LOGOUT,
})
