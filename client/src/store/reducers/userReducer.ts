import { UserActions, UserTypes } from "store/types"
import { logout } from "utils/auth"

export interface IUserState {
  user: IUserEntity
}

const initalState: IUserState = {
  user: null,
}

const reducer = (state = initalState, action: UserActions): IUserState => {
  switch (action.type) {
    case UserTypes.AUTHORIZE:
      const { user } = action
      return { ...state, user }
    case UserTypes.LOGOUT:
      logout()
      return { ...state, user: null }
    default:
      return state
  }
}

export default reducer
