import { MessageActions, MessageTypes } from "store/types"

export const setMessage = (
  message: string,
  error?: boolean,
  success?: boolean
): MessageActions => ({
  type: MessageTypes.SET_MESSAGE,
  message,
  error,
  success,
})
