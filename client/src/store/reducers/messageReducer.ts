import { MessageActions, MessageTypes } from "store/types"

export interface IMessageState {
  message: string
  error: boolean
  success: boolean
}

const initalState: IMessageState = {
  message: "",
  error: false,
  success: false,
}

const reducer = (state = initalState, action: MessageActions): IMessageState => {
  switch (action.type) {
    case MessageTypes.SET_MESSAGE:
      const { message, error, success } = action
      return { ...state, message, error, success }
    default:
      return state
  }
}

export default reducer