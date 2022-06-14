import { useSelector, useDispatch } from "react-redux"
import { Message } from "semantic-ui-react"
import { IMessageState } from "store/reducers/messageReducer"
import { getMessageState } from "store/selectors/messageSelectors"
import { useEffect } from "react"
import { setMessage } from "store/actions/messageActions"

const AdminMessage = () => {
  const state: IMessageState = useSelector(getMessageState)
  const dispatch = useDispatch()
  const { error, message, success } = state

  const hideMessage = () => {
    dispatch(setMessage(""))
  }

  useEffect(() => {
    if (message) {
      setTimeout(hideMessage, 5000)
    }
  }, [message])

  return message ? (
    <Message size="small" negative={error} success={success}>
      <Message.Header>
        {typeof message === "string" ? message : "Unhandled error occurred"}
      </Message.Header>
    </Message>
  ) : null
}

export default AdminMessage
